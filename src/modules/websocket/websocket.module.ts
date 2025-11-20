import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UsageGateway } from './usage.gateway';
import { UserEntity } from '../../database/entities/user.entity';
import { ApiKeyEntity } from '../../database/entities/api-key.entity';
import { ProjectEntity } from '../../database/entities/project.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([UserEntity, ApiKeyEntity, ProjectEntity]),
  ],
  providers: [UsageGateway],
  exports: [UsageGateway],
})
export class WebSocketModule {}
