// database.module.ts
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
      synchronize: process.env.NODE_ENV !== 'production',
      logging: true,
      ssl: true,
      extra: {
        max: 10,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      },
    }),
  ],
})
export class DatabaseModule {}
