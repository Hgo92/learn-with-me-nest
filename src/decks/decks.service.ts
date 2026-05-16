import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Deck } from './deck.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { newDeckClass } from './newDeckClass';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private decksRepository: Repository<Deck>,
  ) {}

  findAllByUser(userId: string) {
    return this.decksRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: string) {
    const deck = await this.decksRepository.findOne({ where: { id } });
    if (!deck) throw new NotFoundException('Deck non trouvé');
    if (deck.userId !== userId) throw new ForbiddenException();
    return deck;
  }

  create(newDeck: newDeckClass, userId: string) {
    const deck = this.decksRepository.create({ ...newDeck, userId });
    return this.decksRepository.save(deck);
  }

  async update(id: number, newDeck: newDeckClass, userId: string) {
    const deck = await this.findOne(id, userId);
    Object.assign(deck, newDeck);
    return this.decksRepository.save(deck);
  }

  async remove(id: number, userId: string) {
    const deck = await this.findOne(id, userId);
    return this.decksRepository.remove(deck);
  }
}
