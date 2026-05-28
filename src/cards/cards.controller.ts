import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Put,
  Delete,
  Patch,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { cardClass } from './cardClass';
import z from 'zod';
import { createGroq } from '@ai-sdk/groq';
import { generateText, Output } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const cardSchema = z.object({
  cards: z.array(
    z.object({
      title: z.string(),
      translation: z.string(),
      deckId: z.number(),
      existingCards: z.string(),
    }),
  ),
});

type Prompt = {
  count: number;
  language: string;
  deckId: number;
  existingCards: string;
  topic?: string;
};

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

  @Post('/generate-ia')
  async generateCards(
    @Body('prompt') prompt: Prompt,
    @Session() session: UserSession,
  ) {
    const result = await generateText({
      model: groq('openai/gpt-oss-20b'),
      output: Output.object({
        schema: cardSchema,
      }),
      prompt: `Generate ${prompt.count} vocabulary cards ${prompt.topic ? `about ${prompt.topic}` : ''} with the word (title) in ${prompt.language} and the translation in French. Title and translation must start with an uppercase letter. Those words are already used (${prompt.existingCards}), don't use them. The deckId is ${prompt.deckId}.`,
    });
    return this.cardsService.createGroup(result.output.cards, session.user.id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() newCard: cardClass,
    @Session() session: UserSession,
  ) {
    return this.cardsService.update(id, newCard, session.user.id);
  }

  @Patch(':id/archive')
  archive(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: UserSession,
  ) {
    return this.cardsService.archive(id, session.user.id);
  }

  @Patch(':id/activate')
  activate(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: UserSession,
  ) {
    return this.cardsService.activate(id, session.user.id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: UserSession,
  ) {
    return this.cardsService.remove(id, session.user.id);
  }
}
