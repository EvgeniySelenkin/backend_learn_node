import { Column } from 'src/columns/entities/column.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

export class Card extends BaseEntity {
  id: string;

  columnId: Column['id'];

  name: string;
}
