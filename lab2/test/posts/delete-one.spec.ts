import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import supertest from 'supertest';
import { app } from '../../src';
import { PostEntity } from '../../src/posts';

describe('DELETE /posts/:id', () => {
  const testPost: PostEntity = {
    id: randomUUID(),
    content: 'Test content',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };

  before(async () => {
    await writeFile('database/posts.json', JSON.stringify([testPost]));
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
