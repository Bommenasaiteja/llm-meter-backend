import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private authService: AuthService) {}

  async onApplicationBootstrap() {
    // Create hardcoded admin user from environment variables if it doesn't exist
    await this.authService.createHardcodedAdmin();
  }
}