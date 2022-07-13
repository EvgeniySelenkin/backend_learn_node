import { describe } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import { app } from '../../src';
import { UserEntity } from '../../src/users';

describe('GET /users', () => {
  const users: UserEntity[] = [
    {
      id: randomUUID(),
      email: 'biba@gmail.com',
      name: 'Biba',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      email: 'boba@gmail.com',
      name: 'Boba',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      email: 'goga@gmail.com',
      name: 'Goga',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  before(async () => {
    await writeFile('database/users.json', JSON.stringify(users));
    return true;
  });

  it('should return users array', (done) => {
    supertest(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).to.be.a('array').to.have.lengthOf(users.length);

        expect(response.body).same.deep.members(users);
      })
      .end(done);
  });
});
