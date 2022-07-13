import { DECORATORS } from '@nestjs/swagger/dist/constants';
import { CardsController } from './cards.controller';

describe('Cards Swagger', () => {
  it('Эндпоинты контроллера сгруппированы с помощью ApiTags', () => {
    const metadata = Reflect.getMetadata(DECORATORS.API_TAGS, CardsController);

    expect(metadata).toBeDefined();
  });
});
