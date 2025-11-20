import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../../database/entities/project.entity';
import { UserEntity } from '../../database/entities/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createProject(name: string, description: string, userId: number) {
    // First verify the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if project with this name already exists
    const existingProject = await this.projectRepository.findOne({ 
      where: { name } 
    });
    
    if (existingProject) {
      throw new Error('Project with this name already exists');
    }

    const project = this.projectRepository.create({
      name,
      description,
      user: { id: userId } as UserEntity,
    });

    return await this.projectRepository.save(project);
  }

  async getUserProjects(userId: number) {
    return await this.projectRepository.find({
      where: { user: { id: userId } },
      order: { name: 'ASC' },
    });
  }

  async getProjectById(id: number, userId: number) {
    return await this.projectRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  async updateProject(id: number, userId: number, updates: Partial<ProjectEntity>) {
    const project = await this.projectRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!project) {
      throw new Error('Project not found or does not belong to user');
    }

    Object.assign(project, updates);
    return await this.projectRepository.save(project);
  }

  async deleteProject(id: number, userId: number) {
    const project = await this.projectRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!project) {
      throw new Error('Project not found or does not belong to user');
    }

    return await this.projectRepository.remove(project);
  }
}