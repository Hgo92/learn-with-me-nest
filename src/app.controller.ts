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
    const deckRepository = this.dataSource.getRepository(Deck);
    return await deckRepository.find();
  }
}
