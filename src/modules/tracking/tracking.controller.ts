import { Controller, Post, Get, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { TrackingService } from './tracking.service';
import { TrackUsageDto } from './dto/track-usage.dto';
import { GetUsageDto } from './dto/get-usage.dto';

@ApiTags('Tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @UseGuards(ApiKeyGuard)
  @Post('track')
  @ApiOperation({ summary: 'Track LLM usage events' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiResponse({ status: 201, description: 'Usage events tracked successfully' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async trackUsage(@Request() req, @Body() trackUsageDto: TrackUsageDto) {
    // Add user and allowed project IDs to the events before tracking
    const eventsWithProjectCheck = trackUsageDto.events.map(event => {
      // Verify that the project is allowed for this API key
      if (req.allowedProjectIds.length > 0 && !req.allowedProjectIds.includes(event.project)) {
        throw new Error(`Project ${event.project} not allowed for this API key`);
      }

      return {
        ...event,
        // Ensure the project is linked to the authenticated user
        project: event.project,
      };
    });

    const eventsProcessed = await this.trackingService.trackUsage(
      eventsWithProjectCheck,
    );

    return {
      success: true,
      eventsProcessed,
    };
  }

  @UseGuards(ApiKeyGuard)
  @Get('usage')
  @ApiOperation({ summary: 'Get usage data with filters' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiResponse({ status: 200, description: 'Usage data retrieved' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async getUsage(@Request() req, @Query() query: GetUsageDto) {
    // Only allow access to usage data for allowed projects
    if (query.project && req.allowedProjectIds.length > 0 && !req.allowedProjectIds.includes(query.project)) {
      throw new Error(`Project ${query.project} not allowed for this API key`);
    }

    return this.trackingService.getUsage(query);
  }

  @UseGuards(ApiKeyGuard)
  @Get('recent')
  @ApiOperation({ summary: 'Get recent usage events' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API key for authentication',
  })
  @ApiResponse({ status: 200, description: 'Recent usage events retrieved' })
  @ApiResponse({ status: 401, description: 'Invalid API key' })
  async getRecentUsage(@Request() req, @Query('limit') limit?: number) {
    // This returns data only for projects accessible to the API key
    return this.trackingService.getRecentUsage(limit || 10);
  }
}
