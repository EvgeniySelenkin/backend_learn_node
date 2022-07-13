import { Injectable } from '@nestjs/common';
import { ColumnsRepository} from './columns.repository';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';


@Injectable()
export class ColumnsService {
  constructor(private readonly columnsRepository: ColumnsRepository) {}

  async getAll(): Promise<Column[]> {
    return this.columnsRepository.find();
  }

  async getById(id: string): Promise<Column> {
    return this.columnsRepository.findOne(id);
  }

  async create(createColumnDto: CreateColumnDto): Promise<Column> {
    return this.columnsRepository.save(createColumnDto);
  }

  async update(id: string, updateColumnDto: UpdateColumnDto): Promise<Column> {
    return this.columnsRepository.update(id, updateColumnDto);
  }

  async remove(id: string): Promise<Boolean> {
    return this.columnsRepository.delete(id);
  }
}
