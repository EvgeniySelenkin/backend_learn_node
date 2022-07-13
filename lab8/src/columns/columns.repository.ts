import { EntityRepository, Repository } from 'typeorm';
import { Column } from './entities/column.entity';

@EntityRepository(Column)
export class ColumnsRepository extends Repository<Column> {}
