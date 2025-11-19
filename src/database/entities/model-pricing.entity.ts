import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';
import { LLMProvider } from '../../types/llm-types';

@Entity('model_pricing')
@Index(['provider', 'model'], { unique: true })
export class ModelPricingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  provider: LLMProvider;

  @Column()
  model: string;

  @Column({ type: 'float', name: 'input_cost_per_1k' })
  inputCostPer1k: number;

  @Column({ type: 'float', name: 'output_cost_per_1k' })
  outputCostPer1k: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
