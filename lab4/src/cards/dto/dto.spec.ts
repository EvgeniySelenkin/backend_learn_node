import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateCardDto } from './create-card.dto';
import { UpdateCardDto } from './update-card.dto';

describe('Cards DTO', () => {
  describe('Create Card DTO', () => {
    it('Should throw error', async () => {
      const obj = { foo: 'bar' };
      const dtoObject = plainToInstance(CreateCardDto, obj);
      const errors = await validate(dtoObject);

      expect(errors.length).not.toBe(0);
    });
  });

  describe('Update Card DTO', () => {
    it('Should throw error', async () => {
      const obj = { name: true };
      const dtoObject = plainToInstance(UpdateCardDto, obj);
      const errors = await validate(dtoObject);

      expect(errors.length).not.toBe(0);
    });
  });
});
