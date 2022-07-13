import { expect } from 'chai';
import { writeFile } from 'fs/promises';
import supertest from 'supertest';
import { app } from '../src';
import { DB_PATH } from '../src/constants';
import { Post } from '../src/types';

describe('DELETE /posts/:id', () => {
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

  it('should delete post', (done) => {
    supertest(app)
      .delete(`/posts/${testPost.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body).to.be.a('boolean').to.eq(true);
      })
      .end(done);
  });
});
