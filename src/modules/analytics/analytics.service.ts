import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { UsageEventEntity } from '../../database/entities/usage-event.entity';
import { DailyStats, ModelStats, ProjectStats } from '../../types/llm-types';
import { GetRequestsDto } from './dto/get-requests.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(UsageEventEntity)
    private usageEventRepository: Repository<UsageEventEntity>,
  ) {}

  async getStats(startDate?: string, endDate?: string, project?: string) {
    const where: any = {};

    if (startDate && endDate) {
      where.timestamp = Between(new Date(startDate), new Date(endDate));
    }

    if (project) {
      where.project = project;
    }

    const events = await this.usageEventRepository.find({ where });

    const totalTokens = events.reduce((sum, e) => sum + e.totalTokens, 0);
    const totalCost = events.reduce((sum, e) => sum + (e.cost || 0), 0);
    const totalRequests = events.length;

    const daily = await this.getDailyStats(7, project);
    const byModel = await this.getModelStats(startDate, endDate, project);
    const byProject = await this.getProjectStats(startDate, endDate);

    return {
      daily,
      byModel,
      byProject,
      totalCost,
      totalTokens,
      totalRequests,
    };
  }

  async getDailyStats(days: number, project?: string): Promise<DailyStats[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const where: any = {
      timestamp: Between(startDate, new Date()),
    };

    if (project) {
      where.project = project;
    }

    const events = await this.usageEventRepository.find({
      where,
      order: { timestamp: 'ASC' },
    });

    // Group by date
    const dailyMap = new Map<string, DailyStats>();

    events.forEach((event) => {
      const dateKey = event.timestamp.toISOString().split('T')[0];

      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, {
          date: dateKey,
          totalTokens: 0,
          inputTokens: 0,
          outputTokens: 0,
          totalCost: 0,
          requestCount: 0,
        });
      }

      const stats = dailyMap.get(dateKey)!;
      stats.totalTokens += event.totalTokens;
      stats.inputTokens += event.inputTokens;
      stats.outputTokens += event.outputTokens;
      stats.totalCost += event.cost || 0;
      stats.requestCount += 1;
    });

    return Array.from(dailyMap.values()).sort((a, b) =>
      a.date.localeCompare(b.date),
    );
  }

  async getModelStats(
    startDate?: string,
    endDate?: string,
    project?: string,
  ): Promise<ModelStats[]> {
    const where: any = {};

    if (startDate && endDate) {
      where.timestamp = Between(new Date(startDate), new Date(endDate));
    }

    if (project) {
      where.project = project;
    }

    const events = await this.usageEventRepository.find({ where });

    // Group by model
    const modelMap = new Map<string, ModelStats>();

    events.forEach((event) => {
      const key = `${event.provider}:${event.model}`;

      if (!modelMap.has(key)) {
        modelMap.set(key, {
          model: event.model,
          provider: event.provider,
          totalTokens: 0,
          totalCost: 0,
          requestCount: 0,
          avgLatencyMs: 0,
        });
      }

      const stats = modelMap.get(key)!;
      stats.totalTokens += event.totalTokens;
      stats.totalCost += event.cost || 0;
      stats.requestCount += 1;
      stats.avgLatencyMs =
        (stats.avgLatencyMs * (stats.requestCount - 1) + event.latencyMs) /
        stats.requestCount;
    });

    return Array.from(modelMap.values()).sort(
      (a, b) => b.totalCost - a.totalCost,
    );
  }

  async getProjectStats(
    startDate?: string,
    endDate?: string,
  ): Promise<ProjectStats[]> {
    const where: any = {};

    if (startDate && endDate) {
      where.timestamp = Between(new Date(startDate), new Date(endDate));
    }

    const events = await this.usageEventRepository.find({ where });

    // Group by project
    const projectMap = new Map<string, ProjectStats>();

    events.forEach((event) => {
      if (!projectMap.has(event.project)) {
        projectMap.set(event.project, {
          project: event.project,
          totalTokens: 0,
          totalCost: 0,
          requestCount: 0,
          models: [],
        });
      }

      const stats = projectMap.get(event.project)!;
      stats.totalTokens += event.totalTokens;
      stats.totalCost += event.cost || 0;
      stats.requestCount += 1;

      if (!stats.models.includes(event.model)) {
        stats.models.push(event.model);
      }
    });

    return Array.from(projectMap.values()).sort(
      (a, b) => b.totalCost - a.totalCost,
    );
  }

  async getRequests(filters: GetRequestsDto) {
    const { page = 1, limit = 50, sortOrder = 'desc', ...queryFilters } = filters;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: FindOptionsWhere<UsageEventEntity> = {};

    if (queryFilters.project) {
      where.project = queryFilters.project;
    }

    if (queryFilters.provider) {
      where.provider = queryFilters.provider as any;
    }

    if (queryFilters.model) {
      where.model = queryFilters.model;
    }

    if (queryFilters.startDate && queryFilters.endDate) {
      where.timestamp = Between(
        new Date(queryFilters.startDate),
        new Date(queryFilters.endDate),
      );
    }

    // Get paginated results
    const [requests, total] = await this.usageEventRepository.findAndCount({
      where,
      order: { timestamp: sortOrder === 'desc' ? 'DESC' : 'ASC' },
      skip,
      take: limit,
    });

    return {
      requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async getRequestById(id: number) {
    const request = await this.usageEventRepository.findOne({
      where: { id },
    });

    if (!request) {
      return null;
    }

    return request;
  }

  async getFunctionStats(
    startDate?: string,
    endDate?: string,
    project?: string,
  ) {
    const where: any = {};

    if (startDate && endDate) {
      where.timestamp = Between(new Date(startDate), new Date(endDate));
    }

    if (project) {
      where.project = project;
    }

    const events = await this.usageEventRepository.find({ where });

    // Group by function name
    const functionMap = new Map<string, any>();

    events.forEach((event) => {
      const functionName = event.functionName || 'unknown';

      if (!functionMap.has(functionName)) {
        functionMap.set(functionName, {
          functionName,
          totalTokens: 0,
          inputTokens: 0,
          outputTokens: 0,
          totalCost: 0,
          requestCount: 0,
          avgLatencyMs: 0,
        });
      }

      const stats = functionMap.get(functionName)!;
      stats.totalTokens += event.totalTokens;
      stats.inputTokens += event.inputTokens;
      stats.outputTokens += event.outputTokens;
      stats.totalCost += event.cost || 0;
      stats.requestCount += 1;
      stats.avgLatencyMs =
        (stats.avgLatencyMs * (stats.requestCount - 1) + event.latencyMs) /
        stats.requestCount;
    });

    return Array.from(functionMap.values()).sort(
      (a, b) => b.totalCost - a.totalCost,
    );
  }
}
