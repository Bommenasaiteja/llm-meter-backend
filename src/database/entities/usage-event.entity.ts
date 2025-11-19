import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';
import { LLMProvider } from '../../types/llm-types';

@Entity('usage_events')
@Index(['project', 'timestamp'])
@Index(['provider', 'model'])
@Index(['functionName'])
export class UsageEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  @Index()
  timestamp: Date;

  @Column()
  @Index()
  project: string;

  @Column({ type: 'text' })
  provider: LLMProvider;

  @Column()
  model: string;

  @Column({ name: 'function_name', nullable: true })
  functionName: string;

  @Column({ name: 'input_tokens' })
  inputTokens: number;

  @Column({ name: 'output_tokens' })
  outputTokens: number;

  @Column({ name: 'total_tokens' })
  totalTokens: number;

  @Column({ type: 'float', nullable: true })
  cost: number;

  @Column({ name: 'latency_ms' })
  latencyMs: number;

  @Column({ name: 'prompt_preview', type: 'text', nullable: true })
  promptPreview: string;

  @Column({ name: 'response_preview', type: 'text', nullable: true })
  responsePreview: string;

  @Column({ type: 'simple-json', nullable: true })
  metadata: Record<string, any>;
}
