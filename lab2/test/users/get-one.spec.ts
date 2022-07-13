import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import supertest from 'supertest';
import { app } from '../../src';
import { PostEntity } from '../../src/posts';
import { UserEntity } from '../../src/users';

describe('GET /users/:id', () => {
  const testUser: UserEntity = {
    id: randomUUID(),
    email: 'biba@gmail.com',
    name: 'Biba',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  before(async () => {
    await writeFile('database/users.json', JSON.stringify([testUser]));
    return true;
  });

  it('should return user with specific ID', (done) => {
    supertest(app)
      .get(`/users/${testUser.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body)
          .to.be.a('object')
          .with.keys('id', 'email', 'name', 'updatedAt', 'createdAt')
          .to.be.deep.equal(testUser);
      })
      .end(done);
  });

  it('should return 404 if post does not exists', (done) => {
    supertest(app)
      .get(`/posts/${testUser.id + 1}`)
      .expect(404)
      .end(done);
  });
});
