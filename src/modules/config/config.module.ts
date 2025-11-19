import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigController } from './config.controller';
import { ConfigService } from './config.service';
import { ModelPricingEntity } from '../../database/entities/model-pricing.entity';
import { ProjectEntity } from '../../database/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelPricingEntity, ProjectEntity])],
  controllers: [ConfigController],
  providers: [ConfigService],
})
export class ConfigurationModule {}
