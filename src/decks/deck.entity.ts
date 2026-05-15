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
} from 'typeorm';

@Entity('decks') // ← nom de la table
export class Deck {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @OneToMany(() => Card, (card) => card.deck)
  cards!: Card[];

  @ManyToOne(() => User, (user) => user.decks, { onDelete: 'CASCADE' })
  user!: User;

  @UpdateDateColumn()
  updatedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
