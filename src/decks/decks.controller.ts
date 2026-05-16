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
import { DecksService } from './decks.service';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { newDeckClass } from './newDeckClass';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Get()
  findAll(@Session() session: UserSession) {
    return this.decksService.findAllByUser(session.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Session() session: any) {
    return this.decksService.findOne(id, session.user.id);
  }

  @Post()
  create(@Body() newDeck: newDeckClass, @Session() session: UserSession) {
    return;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newDeck: newDeckClass,
    @Session() session: UserSession,
  ) {
    return this.decksService.update(id, newDeck, session.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: UserSession,
  ) {
    return this.decksService.remove(id, session.user.id);
  }
}
