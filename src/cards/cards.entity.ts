import { Deck } from 'src/decks/deck.entity';
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

@Entity('cards') // ← nom de la table
export class Card {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  translation!: string;

  @ManyToOne(() => Deck, (deck) => deck.cards, { onDelete: 'CASCADE' })
  deck!: Deck;

  @ManyToOne(() => User, (user) => user.cards, { onDelete: 'CASCADE' })
  user!: User;
}
