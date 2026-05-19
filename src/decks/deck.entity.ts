import { Card } from 'src/cards/cards.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('decks')
export class Deck {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @OneToMany(() => Card, (card) => card.deck)
  cards!: Card[];

  @Column()
  userId!: string;
  @ManyToOne(() => User, (user) => user.decks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
