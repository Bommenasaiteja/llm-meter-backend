import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackingController } from './tracking.controller';
import { TrackingService } from './tracking.service';
import { UsageEventEntity } from '../../database/entities/usage-event.entity';
import { ProjectEntity } from '../../database/entities/project.entity';
import { ModelPricingEntity } from '../../database/entities/model-pricing.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsageEventEntity,
      ProjectEntity,
      ModelPricingEntity,
    ]),
  ],
  controllers: [TrackingController],
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
