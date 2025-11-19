// Provider types
export type LLMProvider = 'openai' | 'anthropic' | 'ollama' | 'gemini' | 'custom';

// Usage event that SDK sends to backend
export interface UsageEvent {
  timestamp: Date | string;
  project: string;
  provider: LLMProvider;
  model: string;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cost?: number;
  latencyMs: number;
  promptPreview?: string;
  responsePreview?: string;
  metadata?: Record<string, any>;
}

// Database entity
export interface UsageEventEntity extends UsageEvent {
  id: number;
  timestamp: Date;
}

// Model pricing configuration
export interface ModelPricing {
  id?: number;
  provider: LLMProvider;
  model: string;
  inputCostPer1k: number;  // USD per 1k tokens
  outputCostPer1k: number;
  updatedAt?: Date;
}

// Project entity
export interface Project {
  id?: number;
  name: string;
  description?: string;
  createdAt?: Date;
}

// Analytics & Statistics
export interface DailyStats {
  date: string;
  totalTokens: number;
  inputTokens: number;
  outputTokens: number;
  totalCost: number;
  requestCount: number;
}

export interface ModelStats {
  model: string;
  provider: LLMProvider;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  avgLatencyMs: number;
}

export interface ProjectStats {
  project: string;
  totalTokens: number;
  totalCost: number;
  requestCount: number;
  models: string[];
}

// API Request/Response types
export interface TrackUsageRequest {
  events: UsageEvent[];
}

export interface TrackUsageResponse {
  success: boolean;
  eventsProcessed: number;
}

export interface GetUsageQuery {
  startDate?: string;
  endDate?: string;
  project?: string;
  provider?: LLMProvider;
  model?: string;
  limit?: number;
  offset?: number;
}

export interface GetUsageResponse {
  events: UsageEventEntity[];
  total: number;
  page: number;
  pageSize: number;
}

export interface GetStatsResponse {
  daily: DailyStats[];
  byModel: ModelStats[];
  byProject: ProjectStats[];
  totalCost: number;
  totalTokens: number;
  totalRequests: number;
}

// SDK Configuration
export interface LLMMeterConfig {
  endpoint: string;
  project: string;
  offline?: boolean;
  apiKey?: string;
  batchSize?: number;
  flushInterval?: number;
}

// WebSocket events
export interface WSUsageUpdate {
  type: 'usage_update';
  data: UsageEvent;
}

export interface WSStatsUpdate {
  type: 'stats_update';
  data: {
    totalCost: number;
    totalTokens: number;
    todayRequests: number;
  };
}

export type WSMessage = WSUsageUpdate | WSStatsUpdate;

// Error types
export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
