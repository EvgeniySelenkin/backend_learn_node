import { Module } from '@nestjs/common';
import { CardsModule } from 'src/cards/cards.module';
import { ColumnsController } from './columns.controller';
import { ColumnsRepository } from './columns.repository';
import { ColumnsService } from './columns.service';

@Module({
  imports: [CardsModule],
  providers: [ColumnsService, ColumnsRepository],
  controllers: [ColumnsController],
})

export class ColumnsModule { }
