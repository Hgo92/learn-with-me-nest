import { Controller, Inject, Get, Param } from '@nestjs/common';
import { DecksService } from './decks.service';

@Controller('decks')
export class DecksController {
  private readonly decksService = Inject(DecksService);
}
