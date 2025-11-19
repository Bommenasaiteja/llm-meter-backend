import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, Index } from 'typeorm';

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
}
