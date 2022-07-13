import { expect } from 'chai';
import { writeFile } from 'fs/promises';
import supertest from 'supertest';
import { app } from '../src';
import { DB_PATH } from '../src/constants';
import { Post } from '../src/types';

describe('GET /posts/:id', () => {
  const testPost: Post = {
    id: 1,
    content: 'Test content',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  before(async () => {
    await writeFile(DB_PATH, JSON.stringify([testPost]));
    return true;
  });

  it('should return post with specific ID', (done) => {
    supertest(app)
      .get(`/posts/${testPost.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body)
          .to.be.a('object')
          .with.keys('id', 'content', 'updatedAt', 'createdAt')
          .to.be.deep.equal(testPost);
      })
      .end(done);
  });

  it('should return 404 if post does not exists', (done) => {
    supertest(app)
      .get(`/posts/${testPost.id + 1}`)
      .expect(404)
      .end(done);
  });
});
