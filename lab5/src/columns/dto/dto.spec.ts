import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateColumnDto } from './create-column.dto';
import { UpdateColumnDto } from './update-column.dto';

describe('Columns DTO', () => {
  describe('Create Column DTO', () => {
    it('Should throw error', async () => {
      const emptyObject = {};
      const dtoObject = plainToInstance(CreateColumnDto, emptyObject);
      const errors = await validate(dtoObject);

      expect(errors.length).not.toBe(0);
    });
  });

  describe('Update Column DTO', () => {
    it('Should throw error', async () => {
      const obj = { name: true };
      const dtoObject = plainToInstance(UpdateColumnDto, obj);
      const errors = await validate(dtoObject);

      expect(errors.length).not.toBe(0);
    });
  });
});
