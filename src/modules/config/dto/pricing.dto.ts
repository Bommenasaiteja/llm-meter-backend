import { IsEnum, IsString, IsNumber, Min, IsOptional } from 'class-validator';

enum Provider {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  OLLAMA = 'ollama',
  GEMINI = 'gemini',
  CUSTOM = 'custom',
}

export class CreatePricingDto {
  @IsEnum(Provider)
  provider: Provider;

  @IsString()
  model: string;

  @IsNumber()
  @Min(0)
  inputCostPer1k: number;

  @IsNumber()
  @Min(0)
  outputCostPer1k: number;
}

export class UpdatePricingDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  inputCostPer1k?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  outputCostPer1k?: number;
}
