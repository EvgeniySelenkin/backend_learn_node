import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CardsRepository } from './cards.repository';
import { Card } from './entities/card.entity';

@Injectable()
export class CardsService extends TypeOrmCrudService<Card>{
    constructor(private readonly cardsRepository: CardsRepository) {
        super(cardsRepository);
    }
}
