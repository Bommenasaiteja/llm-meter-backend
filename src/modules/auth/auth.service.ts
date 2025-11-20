import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../database/entities/user.entity';
import { ApiKeyEntity } from '../../database/entities/api-key.entity';
import { ProjectEntity } from '../../database/entities/project.entity';
import { JwtPayload } from '../../types/auth-types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ApiKeyEntity)
    private apiKeyRepository: Repository<ApiKeyEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async createHardcodedAdmin() {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      console.warn('ADMIN_EMAIL and ADMIN_PASSWORD not set in environment variables');
      return;
    }

    // Check if admin user already exists
    let adminUser = await this.userRepository.findOne({ where: { email } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash(password, 10);
      adminUser = await this.userRepository.save({
        email,
        password: hashedPassword,
        name: 'Admin User',
      });
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  }

  async validateApiKey(apiKey: string): Promise<{ user: UserEntity; allowedProjectIds: number[] } | null> {
    // Hash the provided API key to compare with stored hash
    // For now, let's assume we store the hash of the API key
    // In a real implementation, you'd need a better system
    const apiKeyHash = crypto.createHash('sha256').update(apiKey).digest('hex');
    
    // Find the API key in the database (in a real implementation, you'd store the hash)
    const foundApiKey = await this.apiKeyRepository.findOne({
      where: { key: apiKeyHash },
      relations: ['user'],
    });

    if (foundApiKey && foundApiKey.isActive && (!foundApiKey.expiresAt || foundApiKey.expiresAt > new Date())) {
      // Validate that the projects the key has access to actually exist and belong to the user
      let allowedProjectIds = foundApiKey.projectIds || [];
      
      // If projectIds is empty, it means the key has access to all user's projects
      if (allowedProjectIds.length === 0) {
        const userProjects = await this.projectRepository.find({
          where: { user: { id: foundApiKey.user.id } },
        });
        allowedProjectIds = userProjects.map(p => p.id);
      }

      return {
        user: foundApiKey.user,
        allowedProjectIds,
      };
    }

    return null;
  }

  async createApiKey(userId: number, name: string, description?: string, projectIds?: number[], expiresAt?: Date) {
    // Verify that the user owns these projects
    if (projectIds && projectIds.length > 0) {
      const userProjects = await this.projectRepository.find({
        where: { user: { id: userId } },
      });
      const userProjectIds = userProjects.map(p => p.id);

      const invalidProjectIds = projectIds.filter(id => !userProjectIds.includes(id));
      if (invalidProjectIds.length > 0) {
        throw new BadRequestException(`Invalid project IDs: ${invalidProjectIds.join(', ')}`);
      }
    }

    // Generate a unique API key
    const apiKeyValue = crypto.randomBytes(32).toString('hex');
    const apiKeyHash = crypto.createHash('sha256').update(apiKeyValue).digest('hex');

    const newApiKey = this.apiKeyRepository.create({
      key: apiKeyHash, // Store the hash, not the actual key
      name,
      description,
      user: { id: userId } as UserEntity,
      projectIds: projectIds || [],
      expiresAt,
      isActive: true,
    });

    await this.apiKeyRepository.save(newApiKey);

    // Return the actual key value (only at creation time)
    return {
      key: apiKeyValue,
      apiKey: {
        ...newApiKey,
        key: undefined, // Don't return the hash
      },
    };
  }

  async getUserWithProjects(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['projects'],
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      projects: user.projects.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
      })),
    };
  }

  async getApiKeysForUser(userId: number) {
    return await this.apiKeyRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async revokeApiKey(apiKeyId: number, userId: number) {
    const apiKey = await this.apiKeyRepository.findOne({
      where: { id: apiKeyId, user: { id: userId } },
    });

    if (!apiKey) {
      throw new BadRequestException('API key not found or does not belong to user');
    }

    apiKey.isActive = false;
    await this.apiKeyRepository.save(apiKey);
    return { success: true };
  }
}