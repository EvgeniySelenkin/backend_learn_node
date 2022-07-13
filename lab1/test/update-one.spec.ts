import { expect } from 'chai';
import { writeFile } from 'fs/promises';
import supertest from 'supertest';
import { app } from '../src';
import { DB_PATH } from '../src/constants';
import { Post } from '../src/types';

describe('PATCH /posts/:id', () => {
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

  it('should return updated post', (done) => {
    const updateBody = { content: 'Changed content' };

    supertest(app)
      .patch(`/posts/${testPost.id}`)
      .send(updateBody)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body)
          .to.be.a('object')
          .with.keys('id', 'content', 'updatedAt', 'createdAt');
        expect(response.body.content).equal(updateBody.content);
      })
      .end(done);
  });
});
