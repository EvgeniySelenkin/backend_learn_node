import { expect } from 'chai';
import { randomUUID } from 'crypto';
import { writeFile } from 'fs/promises';
import supertest from 'supertest';
import { app } from '../../src';
import { PostEntity, UpdatePostDto } from '../../src/posts';

describe('PATCH /posts/:id', () => {
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

  it('should return updated post', (done) => {
    const updateBody: UpdatePostDto = { content: 'Changed content' };

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
