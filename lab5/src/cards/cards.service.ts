import { Injectable } from '@nestjs/common';
import { CardsRepository} from './cards.repository';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';


@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository) {}

  async getAll(): Promise<Card[]> {
    return await this.cardsRepository.find();
  }

  async getById(id: string): Promise<Card> {
    return await this.cardsRepository.findOne({id});
  }

  async getByColumnId(id: string): Promise<Card[]> {
    return await this.cardsRepository.find({ where: { columnId: id } });
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    return await this.cardsRepository.save(createCardDto);
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    return await this.cardsRepository.save({id, ...updateCardDto});
  }

  async remove(id: string): Promise<Card> {
    const card = await this.getById(id);
    return await this.cardsRepository.remove(card);
  }
}

