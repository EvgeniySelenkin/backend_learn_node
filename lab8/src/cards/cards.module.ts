import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsRepository } from './cards.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CardsRepository])],
  controllers: [CardsController],
  providers: [CardsService],
  exports: [],
})
export class CardsModule {}
