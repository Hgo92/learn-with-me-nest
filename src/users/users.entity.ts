import { Card } from 'src/cards/cards.entity';
import { Deck } from 'src/decks/deck.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

// Le schéma de ma table users
@Entity('users')
export class User {
  @PrimaryColumn() // String et pas number car BetterAuth utilise des strings pour l'id
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  // Relations vers vos entités existantes
  @OneToMany(() => Card, (card) => card.user)
  cards!: Card[];

  @OneToMany(() => Deck, (deck) => deck.user)
  decks!: Deck[];
}
