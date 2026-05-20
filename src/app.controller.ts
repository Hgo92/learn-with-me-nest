import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Deck } from './decks/deck.entity';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('')
export class AppController {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  @Get('test-decks')
  @AllowAnonymous()
  async getDecks() {
    // On court-circuites complètement TypeORM pour ce test
    return { status: 'ok', message: 'Zéro appel base de données' };
  }
}
