import { dbConnection } from '../src/database/database.config';
import { postsRepository } from '../src/posts/posts.repository';
import sinon, { SinonStub } from 'sinon';
import { Post } from '../src/posts';
import { createFakePosts, createFakeUsers, promisify } from './utils';
import { randomUUID } from 'crypto';
import { expect } from 'chai';
import { User } from '../src/users';
import { FindConditions, FindManyOptions } from 'typeorm';

describe('Test PostsRepository', () => {
  let sinonStubRef: SinonStub;

  const mockPosts: Post[] = createFakePosts(10);

  const mockUser: User = createFakeUsers(1)[0];
  const mockUserPosts: Post[] = createFakePosts(3).map((post) => ({
    ...post,
    author: mockUser,
    authorId: mockUser.id,
  }));

  const fakeGetRepository = sinon.fake(() => {
    return {
      find: (options?: FindManyOptions<Post>) => {
        if (options) {
          if ((options.where as FindConditions<Post>).authorId) {
            return promisify(mockUserPosts);
          }
        }

        return promisify(mockPosts);
      },
      findOne: (id: Post['id']) => {
        return promisify(mockPosts.find((post) => post.id === id));
      },
      findOneOrFail: (id: Post['id']) => {
        return promisify(mockPosts.find((post) => post.id === id));
      },
      save: (dto: Partial<Post>) => {
        return promisify({
          ...dto,
          id: randomUUID(),
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        });
      },
      delete: (id: Post['id']) => {
        return promisify(true);
      },
    };
  });

  before(() => {
    sinonStubRef = sinon
      .stub(dbConnection, 'getRepository')
      .callsFake(fakeGetRepository as any);
    return true;
  });

  afterEach(() => {
    fakeGetRepository.resetHistory();
  });

  after(() => {
    sinonStubRef.restore();
  });

  it('should return users posts', async () => {
    const posts = await postsRepository.findByUserId(mockUser.id);

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(posts).deep.equal(mockUserPosts);
  });
  it('should return posts array', async () => {
    const posts = await postsRepository.findAll();

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(posts).deep.equal(mockPosts);
  });
  it('should return single post', async () => {
    const targetPost = mockPosts[0];

    const post = await postsRepository.findOne(targetPost.id);

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(post).deep.equal(targetPost);
  });
  it('should save post', async () => {
    const dto = { content: 'New post' };

    const newPost = await postsRepository.createOne(dto);

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(newPost).has.keys('id', 'content', 'updatedAt', 'createdAt');
    expect(newPost.id).to.be.an('string');
  });
  it('should update post', async () => {
    const updateDto = { content: 'Updated content' };

    const targetPost = mockPosts[0];
    const updatedPost = await postsRepository.updateOne(
      targetPost.id,
      updateDto
    );

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(updatedPost.content).to.be.equal(updateDto.content);
  });
  it('should delete post', async () => {
    const targetPost = mockPosts[0];
    const deleteResult = await postsRepository.deleteOne(targetPost.id);

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(deleteResult).to.be.an('boolean').and.equal(true);
  });
});
