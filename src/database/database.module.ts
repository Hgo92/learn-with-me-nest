import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { User } from '../users/users.entity';
import { Card } from '../cards/cards.entity';
import { Deck } from '../decks/deck.entity';
import { Account } from '../authentication/accounts.entity';
import { Session } from '../authentication/sessions.entity';
import { Verification } from '../authentication/verification.entity';

config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Card, Deck, Account, Session, Verification],
      synchronize: true, // Je dois le couper une fois en production
      ssl: true, // Nécessaire pour Neon
    }),
  ],
})
export class DatabaseModule {}
