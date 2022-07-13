import { plainToInstance } from 'class-transformer';
import { CreateColumnDto } from './create-column.dto';
import { UpdateColumnDto } from './update-column.dto';
import { DECORATORS } from '@nestjs/swagger/dist/constants';

describe('Columns DTO', () => {
  describe('Create Column DTO', () => {
    it('Поля помечены как @ApiProperty', async () => {
      const obj = new CreateColumnDto();
      obj.name = 'test';

      const dtoObject = plainToInstance(CreateColumnDto, obj);

      const hasSwaggerMetadata = [
        Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES, dtoObject, 'name'),
      ];

      expect(hasSwaggerMetadata.filter(Boolean).length).toBe(1);
    });
  });

  describe('Update Column DTO', () => {
    it('Поля помечены как @ApiProperty', async () => {
      const obj = new UpdateColumnDto();
      obj.name = 'test';

      const dtoObject = plainToInstance(CreateColumnDto, obj);

      const hasSwaggerMetadata = [
        Reflect.getMetadata(DECORATORS.API_MODEL_PROPERTIES, dtoObject, 'name'),
      ];

      expect(hasSwaggerMetadata.filter(Boolean).length).toBe(1);
    });
  });
});
