import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiKeyEntity } from './api-key.entity';
import { ProjectEntity } from './project.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // This will be hashed

  @Column({ nullable: true })
  name?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => ApiKeyEntity, apiKey => apiKey.user, { cascade: true })
  apiKeys: ApiKeyEntity[];

  @OneToMany(() => ProjectEntity, project => project.user, { cascade: true })
  projects: ProjectEntity[];
}