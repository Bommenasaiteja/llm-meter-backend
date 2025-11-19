import { IsOptional, IsString, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

enum Provider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  OLLAMA = 'ollama',
  GEMINI = 'gemini',
  CUSTOM = 'custom',
}

export class GetUsageDto {
  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;

  @IsOptional()
  @IsString()
  project?: string;

  @IsOptional()
  @IsEnum(Provider)
  provider?: Provider;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;
}
