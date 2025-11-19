import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TrackingModule } from './modules/tracking/tracking.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ConfigurationModule } from './modules/config/config.module';
import { WebSocketModule } from './modules/websocket/websocket.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    TrackingModule,
    AnalyticsModule,
    ConfigurationModule,
    WebSocketModule,
  ],
})
export class AppModule {}
