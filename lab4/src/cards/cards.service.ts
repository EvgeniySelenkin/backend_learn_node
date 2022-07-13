import { Injectable } from '@nestjs/common';
import { CardsRepository} from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';


@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  async getAll(): Promise<Card[]> {
    return this.cardsRepository.find();
  }

  async getById(id: string): Promise<Card> {
    return this.cardsRepository.findOne(id);
  }

  async getByColumnId(id: string): Promise<Card[]> {
    return this.cardsRepository.findByColumnId(id);
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsRepository.save(createCardDto);
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardsRepository.update(id, updateCardDto);
  }

  async remove(id: string): Promise<Boolean> {
    return this.cardsRepository.delete(id);
  }
}

