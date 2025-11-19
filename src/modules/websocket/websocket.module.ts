import { Module } from '@nestjs/common';
import { UsageGateway } from './usage.gateway';

@Module({
  providers: [UsageGateway],
  exports: [UsageGateway],
})
export class WebSocketModule {}
