import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Extract API key from header
    const apiKey = request.headers['x-api-key'];
    
    if (!apiKey) {
      return false;
    }

    // Validate the API key
    return this.validateApiKey(apiKey, request);
  }

  private async validateApiKey(apiKey: string, request: any): Promise<boolean> {
    const result = await this.authService.validateApiKey(apiKey);
    
    if (result) {
      request.user = result.user; // Attach user to request
      request.allowedProjectIds = result.allowedProjectIds; // Attach allowed project IDs
      return true;
    }
    
    return false;
  }
}