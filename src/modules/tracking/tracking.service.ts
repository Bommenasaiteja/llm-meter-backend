import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { UsageEventEntity } from '../../database/entities/usage-event.entity';
import { ProjectEntity } from '../../database/entities/project.entity';
import { ModelPricingEntity } from '../../database/entities/model-pricing.entity';
import { UsageEvent, GetUsageQuery } from '../../types/llm-types';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(UsageEventEntity)
    private usageEventRepository: Repository<UsageEventEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ModelPricingEntity)
    private pricingRepository: Repository<ModelPricingEntity>,
  ) {}

  async trackUsage(events: UsageEvent[]): Promise<number> {
    const entities = await Promise.all(
      events.map(async (event) => {
        // Ensure project exists
        await this.ensureProjectExists(event.project);

        // Calculate cost if not provided
        let cost = event.cost;
        if (!cost) {
          cost = await this.calculateCost(
            event.provider,
            event.model,
            event.inputTokens,
            event.outputTokens,
          );
        }

        return this.usageEventRepository.create({
          ...event,
          cost,
          timestamp: new Date(event.timestamp),
        });
      }),
    );

    await this.usageEventRepository.save(entities);
    return entities.length;
  }

  async getUsage(query: GetUsageQuery) {
    const where: FindOptionsWhere<UsageEventEntity> = {};

    if (query.project) {
      where.project = query.project;
    }

    if (query.provider) {
      where.provider = query.provider;
    }

    if (query.model) {
      where.model = query.model;
    }

    if (query.startDate && query.endDate) {
      where.timestamp = Between(
        new Date(query.startDate),
        new Date(query.endDate),
      );
    }

    const [events, total] = await this.usageEventRepository.findAndCount({
      where,
      order: { timestamp: 'DESC' },
      take: query.limit || 50,
      skip: query.offset || 0,
    });

    return {
      events,
      total,
      page: Math.floor((query.offset || 0) / (query.limit || 50)) + 1,
      pageSize: query.limit || 50,
    };
  }

  async getRecentUsage(limit: number) {
    return this.usageEventRepository.find({
      order: { timestamp: 'DESC' },
      take: limit,
    });
  }

  private async ensureProjectExists(projectName: string): Promise<void> {
    const existing = await this.projectRepository.findOne({
      where: { name: projectName },
    });

    if (!existing) {
      await this.projectRepository.save(
        this.projectRepository.create({ name: projectName }),
      );
    }
  }

  private async calculateCost(
    provider: string,
    model: string,
    inputTokens: number,
    outputTokens: number,
  ): Promise<number> {
    const pricing = await this.pricingRepository.findOne({
      where: { provider: provider as any, model },
    });

    if (!pricing) {
      return 0; // No pricing data available
    }

    const inputCost = (inputTokens / 1000) * pricing.inputCostPer1k;
    const outputCost = (outputTokens / 1000) * pricing.outputCostPer1k;

    return inputCost + outputCost;
  }
}
