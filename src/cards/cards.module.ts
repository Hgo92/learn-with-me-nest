import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  providers: [CardsService],
  controllers: [CardsController],
})
export class CardsModule {}
