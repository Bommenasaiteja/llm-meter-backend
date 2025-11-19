import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  // Pricing endpoints
  @Get('pricing')
  async getAllPricing() {
    return this.configService.getAllPricing();
  }

  @Post('pricing')
  async createPricing(@Body() dto: CreatePricingDto) {
    return this.configService.createOrUpdatePricing(dto);
  }

  @Put('pricing/:id')
  async updatePricing(@Param('id') id: number, @Body() dto: UpdatePricingDto) {
    return this.configService.updatePricingById(id, dto);
  }

  @Delete('pricing/:id')
  async deletePricing(@Param('id') id: number) {
    await this.configService.deletePricing(id);
    return { success: true };
  }

  // Project endpoints
  @Get('projects')
  async getAllProjects() {
    return this.configService.getAllProjects();
  }
}
