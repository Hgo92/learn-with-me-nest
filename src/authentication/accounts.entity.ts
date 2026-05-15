import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

// Le schéma de ma table accounts
@Entity('accounts')
export class Account {
  @PrimaryColumn()
  id!: string;

  @Column()
  accountId!: string;

  @Column({ unique: true })
  providerId!: string;

  @Column({ nullable: true })
  accessToken?: string;

  @Column({ nullable: true })
  refreshToken?: string;

  @Column({ type: 'timestamptz', nullable: true })
  accesTokenExpiresAt?: Date;

  @Column({ type: 'timestamptz', nullable: true })
  refreshTokenExpiresAt?: Date;

  @Column({ nullable: true })
  scope?: string;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations
  @OneToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  userId!: string;
}
