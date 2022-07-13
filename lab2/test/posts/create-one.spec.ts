import { expect } from 'chai';
import supertest from 'supertest';
import { app } from '../../src';
import { CreatePostDto } from '../../src/posts';

describe('POST /posts', () => {
  it('should create post', (done) => {
    const payload: CreatePostDto = { content: 'Test post content' };

    supertest(app)
      .post('/posts')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((response) => {
        expect(response.body)
          .to.be.a('object')
          .with.keys('id', 'content', 'updatedAt', 'createdAt');
      })
      .end(done);
  });
});
