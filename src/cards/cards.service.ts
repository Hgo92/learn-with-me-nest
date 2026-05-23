import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './cards.entity';
import { Repository } from 'typeorm';
import { cardClass } from './cardClass';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  findAllByUser(userId: string) {
    return this.cardsRepository.find({ where: { userId } });
  }

  findByDeck(deckId: number, userId: string) {
    return this.cardsRepository.find({
      where: { deckId, userId },
      select: {
        id: true,
        title: true,
        translation: true,
        deckId: true,
      },
    });
  }

  async findOne(id: number, userId: string) {
    const card = await this.cardsRepository.findOne({ where: { id } });
    if (!card) throw new NotFoundException('Carte non trouvée');
    if (card.userId !== userId) throw new ForbiddenException();
    return card;
  }

  create(newCard: cardClass, userId: string) {
    const card = this.cardsRepository.create({ ...newCard, userId });
    return this.cardsRepository.save(card);
  }

  async update(id: number, newCard: cardClass, userId: string) {
    const card = await this.findOne(id, userId);
    Object.assign(card, newCard);
    return this.cardsRepository.save(card);
  }

  async remove(id: number, userId: string) {
    const card = await this.findOne(id, userId);
    return this.cardsRepository.remove(card);
  }

  async archive(id: number, userId: string) {
    const card = await this.findOne(id, userId);
    card.isArchived = true;
    return this.cardsRepository.save(card);
  }

  async activate(id: number, userId: string) {
    const card = await this.findOne(id, userId);
    card.isArchived = false;
    return this.cardsRepository.save(card);
  }
}
