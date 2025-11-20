import { Controller, Post, Body, Get, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequest, LoginResponse, ApiKeyRequest, ApiKeyResponse, UserWithProjects } from '../../types/auth-types';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user and get JWT access token'
  })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    schema: {
      example: {
        success: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          email: 'admin@example.com',
          name: 'Admin User'
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      example: {
        success: false,
        error: 'Invalid credentials'
      }
    }
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    try {
      const result = await this.authService.login(loginDto.email, loginDto.password);
      return {
        success: true,
        token: result.access_token,
        user: result.user,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Invalid credentials',
      };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: 'Get user profile with projects' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User profile with projects' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    const userWithProjects = await this.authService.getUserWithProjects(req.user.sub);
    return userWithProjects;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('api-keys')
  @ApiOperation({ summary: 'Create a new API key' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'API key created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createApiKey(@Request() req, @Body() apiKeyDto: ApiKeyRequest): Promise<ApiKeyResponse> {
    try {
      const result = await this.authService.createApiKey(
        req.user.sub,
        apiKeyDto.name,
        apiKeyDto.description,
        apiKeyDto.projectIds,
        apiKeyDto.expiresAt,
      );

      return {
        success: true,
        key: result.key,
        apiKey: result.apiKey,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to create API key',
      };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('api-keys')
  @ApiOperation({ summary: 'Get all API keys for user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of API keys' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getApiKeys(@Request() req): Promise<{ success: boolean; apiKeys?: any[]; error?: string }> {
    try {
      const apiKeys = await this.authService.getApiKeysForUser(req.user.sub);
      return {
        success: true,
        apiKeys: apiKeys.map(key => ({
          id: key.id,
          name: key.name,
          description: key.description,
          projectIds: key.projectIds,
          isActive: key.isActive,
          expiresAt: key.expiresAt,
          createdAt: key.createdAt,
        })),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to fetch API keys',
      };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('api-keys/:id/revoke')
  @ApiOperation({ summary: 'Revoke an API key' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'API key revoked successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'API key not found' })
  async revokeApiKey(@Request() req, @Body() body: { id: number }): Promise<{ success: boolean; error?: string }> {
    try {
      await this.authService.revokeApiKey(body.id, req.user.sub);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Failed to revoke API key',
      };
    }
  }
}