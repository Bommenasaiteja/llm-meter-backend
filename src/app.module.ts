import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TrackingModule } from './modules/tracking/tracking.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ConfigurationModule } from './modules/config/config.module';
import { WebSocketModule } from './modules/websocket/websocket.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectModule } from './modules/project/project.module';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    ProjectModule,
    TrackingModule,
    AnalyticsModule,
    ConfigurationModule,
    WebSocketModule,
  ],
  providers: [AppService],
})
export class AppModule {}
