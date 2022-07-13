import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColumnsModule } from './columns/columns.module';
import { CardsModule } from './cards/cards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './cards/entities/card.entity';
import { Column } from './columns/entities/column.entity';

@Module({
  imports: [ColumnsModule, CardsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://uaaqxjjl:uOG2YkALsqpGRoVdsAKvl8Nqn7GV2bWg@hattie.db.elephantsql.com/uaaqxjjl',
      entities: [Card, Column],
      synchronize: true,
      logging: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
