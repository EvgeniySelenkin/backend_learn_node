import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { CreateColumnDto } from 'src/columns/dto/create-column.dto';
import { Column } from './entities/column.entity';

describe('Columns controller (e2e)', () => {
  let app: INestApplication;

  let createdColumn: Column;

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

  it('Sends list of all columns with created column', () => {
    return request(app.getHttpServer())
      .get('/columns')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(
          res.body.find((column) => column.id === createdColumn.id),
        ).toBeDefined();
      });
  });

  it('Updates created column', () => {
    const updateDto = { name: 'Changed column name' };

    return request(app.getHttpServer())
      .patch(`/columns/${createdColumn.id}`)
      .send(updateDto)
      .expect((res) => {
        expect(res.body).toHaveProperty('name', updateDto.name);
      });
  });

  it('Deletes updated column', () => {
    request(app.getHttpServer())
      .delete(`/columns/${createdColumn.id}`)
      .expect(200)
      .then(() => {
        return request(app.getHttpServer())
          .get('/columns')
          .expect(200)
          .expect((res) => {
            expect(
              res.body.find((column) => column.id === createdColumn.id),
            ).toBeUndefined();
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
