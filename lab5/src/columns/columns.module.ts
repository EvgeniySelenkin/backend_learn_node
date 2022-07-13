import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from 'src/cards/cards.module';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { Column } from './entities/column.entity';

@Module({
  imports: [CardsModule, TypeOrmModule.forFeature([Column])],
  providers: [ColumnsService],
  controllers: [ColumnsController],
})

export class ColumnsModule { }
