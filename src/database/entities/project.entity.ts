import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relationship
  @ManyToOne(() => UserEntity, user => user.projects, { eager: true })
  user: UserEntity;
}
