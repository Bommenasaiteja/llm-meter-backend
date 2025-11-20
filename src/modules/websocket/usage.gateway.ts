import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UsageEvent } from '../../types/llm-types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { ApiKeyEntity } from '../../database/entities/api-key.entity';
import * as crypto from 'crypto';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class UsageGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(ApiKeyEntity)
    private apiKeyRepository: Repository<ApiKeyEntity>,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);

    // Verify API key from query parameter
    const apiKey = client.handshake.query.apiKey as string;
    if (!apiKey) {
      console.log('No API key provided, disconnecting client');
      client.disconnect(true);
      return;
    }

    try {
      const result = await this.validateApiKey(apiKey);
      if (!result) {
        console.log('Invalid API key, disconnecting client');
        client.disconnect(true);
        return;
      }

      // Store user and project info in the client for later use
      client.data.user = result.user;
      client.data.allowedProjectIds = result.allowedProjectIds;

      console.log(`Client ${client.id} authenticated successfully`);
    } catch (error) {
      console.log('Error validating API key, disconnecting client:', error);
      client.disconnect(true);
      return;
    }
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

  private async validateApiKey(apiKey: string): Promise<{ user: UserEntity; allowedProjectIds: number[] } | null> {
    // Hash the provided API key to compare with stored hash
    const apiKeyHash = crypto.createHash('sha256').update(apiKey).digest('hex');

    const foundApiKey = await this.apiKeyRepository.findOne({
      where: { key: apiKeyHash },
      relations: ['user'],
    });

    if (foundApiKey && foundApiKey.isActive && (!foundApiKey.expiresAt || foundApiKey.expiresAt > new Date())) {
      // For WebSocket, we'll allow access to all user's projects if projectIds is empty
      // or only to the specified project IDs
      let allowedProjectIds = foundApiKey.projectIds || [];

      return {
        user: foundApiKey.user,
        allowedProjectIds,
      };
    }

    return null;
  }
}
