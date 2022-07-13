import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { Card } from './entities/card.entity';
import { Column } from 'src/columns/entities/column.entity';
import { CreateCardDto } from './dto/create-card.dto';

describe('Cards controller (e2e)', () => {
  let app: INestApplication;

  let createdColumn: Column;
  let createdCard: Card;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Creates column and send created column', () => {
    const createColumnDto: CreateColumnDto = { name: 'First column' };

    return request(app.getHttpServer())
      .post('/columns')
      .send(createColumnDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            updatedAt: expect.any(String),
            createdAt: expect.any(String),
          }),
        );
        createdColumn = res.body;
      });
  });

  it('Creates card for specific column', async () => {
    const createCardDto: CreateCardDto = {
      name: 'First card',
      columnId: createdColumn.id,
    };

    return request(app.getHttpServer())
      .post('/cards')
      .send(createCardDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: createCardDto.name,
            columnId: createCardDto.columnId,
            updatedAt: expect.any(String),
            createdAt: expect.any(String),
          }),
        );
        createdCard = res.body;
      });
  });

  it('Sends list of all cards with created card', () => {
    return request(app.getHttpServer())
      .get('/cards')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);

        expect(
          res.body.find((card) => card.id === createdCard.id),
        ).toBeDefined();
      });
  });

  it('Updates created card', () => {
    const updateDto = { name: 'Changed card name' };

    return request(app.getHttpServer())
      .patch(`/cards/${createdCard.id}`)
      .send(updateDto)
      .expect((res) => {
        expect(res.body).toHaveProperty('name', updateDto.name);
      });
  });

  it('Sends list of card for specific column', () => {
    return request(app.getHttpServer())
      .get(`/columns/${createdColumn.id}/cards`)
      .expect((res) => {
        expect(
          res.body.find((card) => card.id === createdCard.id),
        ).toBeDefined();
      });
  });

  it('Deletes updated card', async () => {
    await request(app.getHttpServer())
      .delete(`/cards/${createdCard.id}`)
      .expect(200);

    return request(app.getHttpServer())
      .get('/cards')
      .expect(200)
      .expect((res) => {
        expect(
          res.body.find((card) => card.id === createdCard.id),
        ).toBeUndefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
