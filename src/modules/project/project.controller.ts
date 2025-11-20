import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProjectService } from './project.service';

@ApiTags('Projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Project with this name already exists' })
  async createProject(
    @Request() req,
    @Body() body: { name: string; description?: string }
  ) {
    const project = await this.projectService.createProject(
      body.name,
      body.description || '',
      req.user.userId
    );

    return {
      success: true,
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
      },
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ summary: 'Get all projects for authenticated user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'List of projects' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserProjects(@Request() req) {
    const projects = await this.projectService.getUserProjects(req.user.userId);

    return {
      success: true,
      projects: projects.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        createdAt: p.createdAt,
      })),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific project by ID' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Project details' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async getProject(@Request() req, @Param('id') id: string) {
    const project = await this.projectService.getProjectById(Number(id), req.user.userId);

    if (!project) {
      return {
        success: false,
        error: 'Project not found',
      };
    }

    return {
      success: true,
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
      },
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  @ApiOperation({ summary: 'Update a project' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Project updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async updateProject(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { name?: string; description?: string }
  ) {
    const project = await this.projectService.updateProject(
      Number(id),
      req.user.userId,
      body
    );

    return {
      success: true,
      project: {
        id: project.id,
        name: project.name,
        description: project.description,
        createdAt: project.createdAt,
      },
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Project deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  async deleteProject(@Request() req, @Param('id') id: string) {
    await this.projectService.deleteProject(Number(id), req.user.userId);

    return {
      success: true,
      message: 'Project deleted successfully',
    };
  }
}