import { describe } from 'mocha';
import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../src';
import { writeFile } from 'fs/promises';
import { DB_PATH } from '../src/constants';
import { Post } from '../src/types';

describe('GET /posts', () => {
  const posts: Post[] = [
    {
      id: 1,
      content: 'Post #1',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      content: 'Post #2',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      content: 'Post #3',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];

  before(async () => {
    await writeFile(DB_PATH, JSON.stringify(posts));
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
