import { MergedCrudOptions } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CRUD_OPTIONS_METADATA } from '@nestjsx/crud/lib/constants';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';

describe('Cards CRUD', () => {
  it('Контроллер объявлен как CRUD-контроллер', () => {
    const metadata = Reflect.getMetadata(
      CRUD_OPTIONS_METADATA,
      CardsController,
    ) as MergedCrudOptions | undefined;

    expect(metadata).toBeDefined();
  });

  it('Column выбран как Model для CRUD-а', () => {
    const metadata = Reflect.getMetadata(
      CRUD_OPTIONS_METADATA,
      CardsController,
    ) as MergedCrudOptions | undefined;

    expect(metadata.model.type).toBe(Card);
  });

  it('В CRUD-опциях переданы кастомные DTO на Create и Update', () => {
    const metadata = Reflect.getMetadata(
      CRUD_OPTIONS_METADATA,
      CardsController,
    ) as MergedCrudOptions | undefined;

    expect(metadata.dto.create).toBeDefined();
    expect(metadata.dto.update).toBeDefined();
  });

  it('Сервис наследует TypeOrmCrudService', () => {
    expect(CardsService.prototype instanceof TypeOrmCrudService).toBeTruthy();
  });
});
