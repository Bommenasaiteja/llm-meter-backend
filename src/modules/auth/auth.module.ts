import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserEntity } from '../../database/entities/user.entity';
import { ApiKeyEntity } from '../../database/entities/api-key.entity';
import { ProjectEntity } from '../../database/entities/project.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ApiKeyEntity, ProjectEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_for_dev',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}