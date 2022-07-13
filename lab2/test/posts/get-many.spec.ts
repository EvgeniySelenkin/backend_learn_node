import { describe } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import { PostEntity } from '../../src/posts';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import { app } from '../../src';

describe('GET /posts', () => {
  const posts: PostEntity[] = [
    {
      id: randomUUID(),
      content: 'Post #1',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      content: 'Post #2',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: randomUUID(),
      content: 'Post #3',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  before(async () => {
    await writeFile('database/posts.json', JSON.stringify(posts));
    return true;
  });

  it('should return posts array', (done) => {
    supertest(app)
      .get('/posts')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).to.be.a('array').to.have.lengthOf(posts.length);

        expect(response.body).same.deep.members(posts);
      })
      .end(done);
  });
});
