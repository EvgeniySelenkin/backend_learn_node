import { Controller, Body, Param, Delete, Get, Patch, Post } from '@nestjs/common'
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get()
  getAll(): Promise<Card[]> {
    return this.cardsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.getById(id);
  }

  @Post()
  create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Patch(':id')
  update(@Body() updateCardDto: UpdateCardDto, @Param('id') id: string): Promise<Card> {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Card> {
    return this.cardsService.remove(id);
  }
}
