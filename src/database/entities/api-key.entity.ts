import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm';
import { UserEntity } from './user.entity';
import { ProjectEntity } from './project.entity';

@Entity('api_keys')
export class ApiKeyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string; // The actual API key (hashed)

  @Column()
  name: string; // Name for the key (e.g., "Production API Key")

  @Column({ nullable: true })
  description?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => UserEntity, user => user.apiKeys, { eager: true })
  user: UserEntity;

  @Column({ type: 'simple-array', nullable: true }) // Store project IDs as array
  projectIds: number[];
}