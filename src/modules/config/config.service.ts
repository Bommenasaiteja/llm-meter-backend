import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelPricingEntity } from '../../database/entities/model-pricing.entity';
import { ProjectEntity } from '../../database/entities/project.entity';
import { CreatePricingDto, UpdatePricingDto } from './dto/pricing.dto';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(ModelPricingEntity)
    private pricingRepository: Repository<ModelPricingEntity>,
    @InjectRepository(ProjectEntity)
    private projectRepository: Repository<ProjectEntity>,
  ) {
    this.seedDefaultPricing();
  }

  async getAllPricing() {
    return this.pricingRepository.find();
  }

  async createOrUpdatePricing(dto: CreatePricingDto) {
    const existing = await this.pricingRepository.findOne({
      where: { provider: dto.provider, model: dto.model },
    });

    if (existing) {
      Object.assign(existing, dto);
      return this.pricingRepository.save(existing);
    }

    return this.pricingRepository.save(this.pricingRepository.create(dto));
  }

  async updatePricingById(id: number, dto: UpdatePricingDto) {
    await this.pricingRepository.update(id, dto);
    return this.pricingRepository.findOne({ where: { id } });
  }

  async deletePricing(id: number) {
    await this.pricingRepository.delete(id);
  }

  async getAllProjects() {
    return this.projectRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  private async seedDefaultPricing() {
    const count = await this.pricingRepository.count();
    if (count > 0) return; // Already seeded

    const defaultPricing = [
      // OpenAI GPT-4
      {
        provider: 'openai' as any,
        model: 'gpt-4',
        inputCostPer1k: 0.03,
        outputCostPer1k: 0.06,
      },
      {
        provider: 'openai' as any,
        model: 'gpt-4-turbo',
        inputCostPer1k: 0.01,
        outputCostPer1k: 0.03,
      },
      {
        provider: 'openai' as any,
        model: 'gpt-3.5-turbo',
        inputCostPer1k: 0.0005,
        outputCostPer1k: 0.0015,
      },
      // Anthropic Claude
      {
        provider: 'anthropic' as any,
        model: 'claude-3-opus-20240229',
        inputCostPer1k: 0.015,
        outputCostPer1k: 0.075,
      },
      {
        provider: 'anthropic' as any,
        model: 'claude-3-sonnet-20240229',
        inputCostPer1k: 0.003,
        outputCostPer1k: 0.015,
      },
      {
        provider: 'anthropic' as any,
        model: 'claude-3-haiku-20240307',
        inputCostPer1k: 0.00025,
        outputCostPer1k: 0.00125,
      },
      // Ollama (local - free)
      {
        provider: 'ollama' as any,
        model: 'llama2',
        inputCostPer1k: 0,
        outputCostPer1k: 0,
      },
    ];

    await this.pricingRepository.save(defaultPricing);
  }
}
