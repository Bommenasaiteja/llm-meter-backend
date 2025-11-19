import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { TrackUsageDto } from './dto/track-usage.dto';
import { GetUsageDto } from './dto/get-usage.dto';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('track')
  async trackUsage(@Body() trackUsageDto: TrackUsageDto) {
    const eventsProcessed = await this.trackingService.trackUsage(
      trackUsageDto.events,
    );

    return {
      success: true,
      eventsProcessed,
    };
  }

  @Get('usage')
  async getUsage(@Query() query: GetUsageDto) {
    return this.trackingService.getUsage(query);
  }

  @Get('recent')
  async getRecentUsage(@Query('limit') limit?: number) {
    return this.trackingService.getRecentUsage(limit || 10);
  }
}
