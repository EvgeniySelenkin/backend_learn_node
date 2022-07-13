import { MergedCrudOptions } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CRUD_OPTIONS_METADATA } from '@nestjsx/crud/lib/constants';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { Column } from './entities/column.entity';

describe('Columns CRUD', () => {
  it('Контроллер объявлен как CRUD-контроллер', () => {
    const metadata = Reflect.getMetadata(
      CRUD_OPTIONS_METADATA,
      ColumnsController,
    ) as MergedCrudOptions | undefined;

    expect(metadata).toBeDefined();
  });

  it('Column выбран как Model для CRUD-а', () => {
    const metadata = Reflect.getMetadata(
      CRUD_OPTIONS_METADATA,
      ColumnsController,
    ) as MergedCrudOptions | undefined;

    expect(metadata.model.type).toBe(Column);
  });

  it('В CRUD-опциях переданы кастомные DTO на Create и Update', () => {
    const metadata = Reflect.getMetadata(
      CRUD_OPTIONS_METADATA,
      ColumnsController,
    ) as MergedCrudOptions | undefined;

    expect(metadata.dto.create).toBeDefined();
    expect(metadata.dto.update).toBeDefined();
  });

  it('Сервис наследует TypeOrmCrudService', () => {
    expect(ColumnsService.prototype instanceof TypeOrmCrudService).toBeTruthy();
  });
});
