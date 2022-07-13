import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';


@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(Column)
    private columnsRepository: Repository<Column>,
  ) {}

  async getAll(): Promise<Column[]> {
    return await this.columnsRepository.find();
  }

  async getById(id: string): Promise<Column> {
    return await this.columnsRepository.findOne({id});
  }

  async create(createColumnDto: CreateColumnDto): Promise<Column> {
    return await this.columnsRepository.save(createColumnDto);
  }

  async update(id: string, updateColumnDto: UpdateColumnDto): Promise<Column> {
    return await this.columnsRepository.save({id, ...updateColumnDto});
  }

  async remove(id: string): Promise<Column> {
    const column = await this.getById(id);
    return await this.columnsRepository.remove(column);
  }
}
