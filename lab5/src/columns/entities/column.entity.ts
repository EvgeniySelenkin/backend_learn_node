import { Card } from 'src/cards/entities/card.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, PrimaryGeneratedColumn, Column as ColumnDb, OneToMany } from 'typeorm';

const tableName = 'columns';

@Entity({ name: tableName})
export class Column extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDb('varchar')
  name: string;

  @OneToMany(type => Card, card => card.column, { cascade: true}) 
  cards?: Card[]
}
