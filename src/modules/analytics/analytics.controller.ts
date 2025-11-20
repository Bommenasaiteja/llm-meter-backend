import { Controller, Get, Query, Param, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { GetRequestsDto } from './dto/get-requests.dto';

@ApiTags('Analytics')
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(ApiKeyGuard)
  @Get('stats')
  @ApiOperation({ summary: 'Get overall usage statistics' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'project', required: false, description: 'Project name to filter by' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async getStats(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('project') project?: string,
  ) {
    // Check if the requested project is allowed for this API key
    if (project && req.allowedProjectIds.length > 0 && !req.allowedProjectIds.includes(project)) {
      throw new Error(`Project ${project} not allowed for this API key`);
    }
    return this.analyticsService.getStats(startDate, endDate, project);
  }

  @UseGuards(ApiKeyGuard)
  @Get('daily')
  @ApiOperation({ summary: 'Get daily usage statistics' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiQuery({ name: 'days', required: false, description: 'Number of days to retrieve (default: 7)' })
  @ApiQuery({ name: 'project', required: false, description: 'Project name to filter by' })
  @ApiResponse({ status: 200, description: 'Daily statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async getDailyStats(
    @Request() req,
    @Query('days') days?: number,
    @Query('project') project?: string,
  ) {
    // Check if the requested project is allowed for this API key
    if (project && req.allowedProjectIds.length > 0 && !req.allowedProjectIds.includes(project)) {
      throw new Error(`Project ${project} not allowed for this API key`);
    }
    return this.analyticsService.getDailyStats(days || 7, project);
  }

  @UseGuards(ApiKeyGuard)
  @Get('models')
  @ApiOperation({ summary: 'Get model-specific usage statistics' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'project', required: false, description: 'Project name to filter by' })
  @ApiResponse({ status: 200, description: 'Model statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async getModelStats(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('project') project?: string,
  ) {
    // Check if the requested project is allowed for this API key
    if (project && req.allowedProjectIds.length > 0 && !req.allowedProjectIds.includes(project)) {
      throw new Error(`Project ${project} not allowed for this API key`);
    }
    return this.analyticsService.getModelStats(startDate, endDate, project);
  }

  @UseGuards(ApiKeyGuard)
  @Get('projects')
  @ApiOperation({ summary: 'Get project-specific usage statistics' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date in YYYY-MM-DD format' })
  @ApiResponse({ status: 200, description: 'Project statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async getProjectStats(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getProjectStats(startDate, endDate);
  }

  @UseGuards(ApiKeyGuard)
  @Get('requests')
  @ApiOperation({ summary: 'Get usage requests with filters' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiResponse({ status: 200, description: 'Usage requests retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async getRequests(@Request() req, @Query() filters: GetRequestsDto) {
    // Check if the requested project is allowed for this API key
    if (filters.project && req.allowedProjectIds.length > 0 && !req.allowedProjectIds.includes(filters.project)) {
      throw new Error(`Project ${filters.project} not allowed for this API key`);
    }
    return this.analyticsService.getRequests(filters);
  }

  @UseGuards(ApiKeyGuard)
  @Get('requests/:id')
  @ApiOperation({ summary: 'Get a specific usage request by ID' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiResponse({ status: 200, description: 'Usage request retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  @ApiResponse({ status: 404, description: 'Request not found' })
  async getRequestById(@Request() req, @Param('id') id: string) {
    const request = await this.analyticsService.getRequestById(parseInt(id));
    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }
    // Additional check could be added here to verify the request belongs to an allowed project
    if (req.allowedProjectIds.length > 0 && !req.allowedProjectIds.includes(request.project)) {
      throw new Error(`Request does not belong to an allowed project for this API key`);
    }
    return request;
  }

  @UseGuards(ApiKeyGuard)
  @Get('functions')
  @ApiOperation({ summary: 'Get function-specific usage statistics' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiQuery({ name: 'startDate', required: false, description: 'Start date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'endDate', required: false, description: 'End date in YYYY-MM-DD format' })
  @ApiQuery({ name: 'project', required: false, description: 'Project name to filter by' })
  @ApiResponse({ status: 200, description: 'Function statistics retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async getFunctionStats(
    @Request() req,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('project') project?: string,
  ) {
    // Check if the requested project is allowed for this API key
    if (project && req.allowedProjectIds.length > 0 && !req.allowedProjectIds.includes(project)) {
      throw new Error(`Project ${project} not allowed for this API key`);
    }
    return this.analyticsService.getFunctionStats(startDate, endDate, project);
  }
}
