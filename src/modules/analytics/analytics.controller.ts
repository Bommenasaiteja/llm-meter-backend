import { Controller, Get, Query, Param, NotFoundException } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { GetRequestsDto } from './dto/get-requests.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('stats')
  async getStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('project') project?: string,
  ) {
    return this.analyticsService.getStats(startDate, endDate, project);
  }

  @Get('daily')
  async getDailyStats(
    @Query('days') days?: number,
    @Query('project') project?: string,
  ) {
    return this.analyticsService.getDailyStats(days || 7, project);
  }

  @Get('models')
  async getModelStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('project') project?: string,
  ) {
    return this.analyticsService.getModelStats(startDate, endDate, project);
  }

  @Get('projects')
  async getProjectStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.analyticsService.getProjectStats(startDate, endDate);
  }

  @Get('requests')
  async getRequests(@Query() filters: GetRequestsDto) {
    return this.analyticsService.getRequests(filters);
  }

  @Get('requests/:id')
  async getRequestById(@Param('id') id: string) {
    const request = await this.analyticsService.getRequestById(parseInt(id));
    if (!request) {
      throw new NotFoundException(`Request with ID ${id} not found`);
    }
    return request;
  }

  @Get('functions')
  async getFunctionStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('project') project?: string,
  ) {
    return this.analyticsService.getFunctionStats(startDate, endDate, project);
  }
}
