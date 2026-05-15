import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Deck } from './decks/deck.entity';

@Controller('')
export class AppController {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  @Get('test-decks')
  async getDecks() {
    const deckRepository = this.dataSource.getRepository(Deck);
    return await deckRepository.find();
  }
}
