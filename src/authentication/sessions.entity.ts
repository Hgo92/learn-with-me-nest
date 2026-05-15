import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity('sessions')
export class Session {
  @PrimaryColumn()
  id!: string;

  @Column({ type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ unique: true })
  token!: string;

  @Column({ nullable: true })
  ipAddress?: string;

  @Column({ nullable: true })
  userAgent?: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  userId!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
