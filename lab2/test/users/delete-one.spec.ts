import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import supertest from 'supertest';
import { app } from '../../src';
import { UserEntity } from '../../src/users';

describe('DELETE /users/:id', () => {
  const testUser: UserEntity = {
    id: randomUUID(),
    email: 'hello@world.js',
    name: 'John Doe',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  before(async () => {
    await writeFile('database/users.json', JSON.stringify([testUser]));
    return true;
  });

  it('should delete user', (done) => {
    supertest(app)
      .delete(`/users/${testUser.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).to.be.a('boolean').to.eq(true);
      })
      .end(done);
  });
});
