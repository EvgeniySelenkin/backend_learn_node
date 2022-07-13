import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ColumnsRepository } from './columns.repository';
import { Column } from './entities/column.entity';

@Injectable()
export class ColumnsService extends TypeOrmCrudService<Column> {
    constructor(private readonly columnsRepository: ColumnsRepository) {
        super(columnsRepository);
    }
}
