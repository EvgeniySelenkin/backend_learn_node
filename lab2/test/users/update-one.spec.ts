import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import supertest from 'supertest';
import { app } from '../../src';
import { UserEntity } from '../../src/users';
import { UpdateUserDto } from '../../src/users/users.dto';

describe('PATCH /posts/:id', () => {
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

  it('should return updated user', (done) => {
    const updateBody: UpdateUserDto = { name: 'Another Biba' };

    supertest(app)
      .patch(`/users/${testUser.id}`)
      .send(updateBody)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body)
          .to.be.a('object')
          .with.keys('id', 'email', 'name', 'updatedAt', 'createdAt');
        expect(response.body.name).equal(updateBody.name);
      })
      .end(done);
  });
});
