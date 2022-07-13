import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../../src';
import { CreateUserDto } from '../../src/users/users.dto';

describe('POST /users', () => {
  it('should create user', (done) => {
    const payload: CreateUserDto = {
      email: 'test@gmail.com',
      name: 'John Doe',
      age: 22,
      phone: '+79081234455',
    };

    supertest(app)
      .post('/users')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body)
          .to.be.a('object')
          .with.keys(
            'id',
            'email',
            'name',
            'age',
            'phone',
            'updatedAt',
            'createdAt'
          );
      })
      .end(done);
  });
});
