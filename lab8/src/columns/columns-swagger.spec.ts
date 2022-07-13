import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { ColumnsController } from './columns.controller';

describe('Columns Swagger', () => {
  it('Эндпоинты контроллера сгруппированы с помощью ApiTags', () => {
    const metadata = Reflect.getMetadata(
      DECORATORS.API_TAGS,
      ColumnsController,
    );

    expect(metadata).toBeDefined();
  });
});
