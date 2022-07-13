import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { faker } from '@faker-js/faker';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  let testUsername: string;
  let testPassword: string;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    testUsername = faker.internet.userName();
    testPassword = faker.internet.password();
  });

  it('Получаю JWT-токен после регистрации', () => {
    const signUpDto = { username: testUsername, password: testPassword };

    return request(app.getHttpServer())
      .post('/auth/signUp')
      .send(signUpDto)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            jwtToken: expect.any(String),
          }),
        );
        jwtToken = res.body.jwtToken;
      });
  });

  it('Получаю JWT-токен после авторизации', () => {
    const signInDto = { username: testUsername, password: testPassword };

    return request(app.getHttpServer())
      .post('/auth/signIn')
      .send(signInDto)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            jwtToken: expect.any(String),
          }),
        );
        jwtToken = res.body.jwtToken;
      });
  });

  it('Получаю ошибку при обращении к защищенному эндпоинту без JWT-токена', () => {
    return request(app.getHttpServer()).get('/private').expect(401);
  });

  it('Получаю доступ к защищенному эндпоинту с JWT-токеном', () => {
    return request(app.getHttpServer())
      .get('/private')
      .auth(jwtToken, { type: 'bearer' })
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
