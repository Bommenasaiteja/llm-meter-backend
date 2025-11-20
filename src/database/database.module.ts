import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsageEventEntity } from './entities/usage-event.entity';
import { ModelPricingEntity } from './entities/model-pricing.entity';
import { ProjectEntity } from './entities/project.entity';
import { UserEntity } from './entities/user.entity';
import { ApiKeyEntity } from './entities/api-key.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || './data/llm-meter.db',
      entities: [UsageEventEntity, ModelPricingEntity, ProjectEntity, UserEntity, ApiKeyEntity],
      synchronize: true, // Auto-create tables (disable in production)
      logging: process.env.NODE_ENV === 'development',
    }),
  ],
})
export class DatabaseModule {}
