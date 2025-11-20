import { DataSource } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { ApiKeyEntity } from './entities/api-key.entity';
import { ProjectEntity } from './entities/project.entity';
import { UsageEventEntity } from './entities/usage-event.entity';
import { ModelPricingEntity } from './entities/model-pricing.entity';

export default new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_PATH || './data/llm-meter.db',
  synchronize: false, // Set to false in production, true for development only
  logging: process.env.NODE_ENV === 'development',
  entities: [
    UserEntity,
    ApiKeyEntity,
    ProjectEntity,
    UsageEventEntity,
    ModelPricingEntity,
  ],
  migrations: ['src/database/migrations/*.ts'],
  subscribers: [],
});