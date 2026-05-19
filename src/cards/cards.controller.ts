import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { cardClass } from './cardClass';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  findAll(@Session() session: UserSession) {
    return this.cardsService.findAllByUser(session.user.id);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: UserSession,
  ) {
    return this.cardsService.findOne(id, session.user.id);
  }

  @Post()
  create(@Body() newCard: cardClass, @Session() session: UserSession) {
    return this.cardsService.create(newCard, session.user.id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newCard: cardClass,
    @Session() session: UserSession,
  ) {
    return this.cardsService.update(id, newCard, session.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: UserSession,
  ) {
    return this.cardsService.remove(id, session.user.id);
  }
}
