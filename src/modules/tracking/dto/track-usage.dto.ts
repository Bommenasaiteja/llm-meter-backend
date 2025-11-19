import { IsArray, ValidateNested, IsString, IsNumber, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

enum Provider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  OLLAMA = 'ollama',
  GEMINI = 'gemini',
  CUSTOM = 'custom',
}

export class UsageEventDto {
  @IsDateString()
  timestamp: string;

  @IsString()
  project: string;

  @IsEnum(Provider)
  provider: Provider;

  @IsString()
  model: string;

  @IsOptional()
  @IsString()
  functionName?: string;

  @IsNumber()
  inputTokens: number;

  @IsNumber()
  outputTokens: number;

  @IsNumber()
  totalTokens: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsNumber()
  latencyMs: number;

  @IsOptional()
  @IsString()
  promptPreview?: string;

  @IsOptional()
  @IsString()
  responsePreview?: string;

  @IsOptional()
  metadata?: Record<string, any>;
}

export class TrackUsageDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UsageEventDto)
  events: UsageEventDto[];
}
