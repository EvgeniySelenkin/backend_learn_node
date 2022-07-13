import { Controller, Body, Param, Delete, Get, Patch, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';
import { Card } from 'src/cards/entities/card.entity';
import { CardsService } from 'src/cards/cards.service';


@Controller('columns')
export class ColumnsController {
  constructor(
    private readonly columnsService: ColumnsService,
    private readonly cardsService: CardsService
  ) { }

  @Get()
  getAll(): Promise<Column[]> {
    return this.columnsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Column> {
    return this.columnsService.getById(id);
  }

  @Get(':id/cards')
  getColumnCards(@Param('id') id: string): Promise<Card[]> {
    return this.cardsService.getByColumnId(id);
  }

  @Post()
  create(@Body() createColumnDto: CreateColumnDto): Promise<Column> {
    return this.columnsService.create(createColumnDto);
  }

  @Patch(':id')
  update(@Body() updateColumnDto: UpdateColumnDto, @Param('id') id: string): Promise<Column> {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Boolean> {
    return this.columnsService.remove(id);
  }
}
