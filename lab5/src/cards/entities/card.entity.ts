import { Column } from 'src/columns/entities/column.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column as ColumdDb, ManyToOne, JoinColumn} from 'typeorm';

const tableName = 'cards'

@Entity({ name: tableName })
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumdDb('uuid')
  columnId: Column['id'];

  @ColumdDb('varchar')
  name: string;

  @ManyToOne(type => Column, column => column.cards, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'columnId'})
  column: Column
}
