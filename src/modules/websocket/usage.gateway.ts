import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsageEvent } from '../../types/llm-types';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class UsageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  broadcastUsageUpdate(event: UsageEvent) {
    this.server.emit('usage_update', {
      type: 'usage_update',
      data: event,
    });
  }

  broadcastStatsUpdate(stats: {
    totalCost: number;
    totalTokens: number;
    todayRequests: number;
  }) {
    this.server.emit('stats_update', {
      type: 'stats_update',
      data: stats,
    });
  }
}
