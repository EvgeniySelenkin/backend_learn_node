import { dbConnection } from '../src/database/database.config';
import { postsRepository } from '../src/posts/posts.repository';
import sinon, { SinonStub } from 'sinon';
import { Post } from '../src/posts';
import { createFakePosts, createFakeUsers, promisify } from './utils';
import { randomUUID } from 'crypto';
import { expect } from 'chai';
import { User, usersRepository } from '../src/users';

describe('Test UsersRepository', () => {
  let sinonStubRef: SinonStub;

  const mockUsers: User[] = createFakeUsers(10);

  const fakeGetRepository = sinon.fake(() => {
    return {
      find: () => {
        return promisify(mockUsers);
      },
      findOne: (id: User['id']) => {
        return promisify(mockUsers.find((post) => post.id === id));
      },
      findOneOrFail: (id: User['id']) => {
        return promisify(mockUsers.find((post) => post.id === id));
      },
      save: (dto: Partial<User>) => {
        return promisify({
          ...dto,
          id: randomUUID(),
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        });
      },
      delete: (id: User['id']) => {
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

  it('should return users array', async () => {
    const users = await usersRepository.findAll();

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(users).deep.equal(mockUsers);
  });
  it('should return single user', async () => {
    const targetUser = mockUsers[0];

    const user = await usersRepository.findOne(targetUser.id);

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(user).deep.equal(targetUser);
  });
  it('should save user', async () => {
    const dto = { email: 'bebra@gmail.com', name: 'Unknown Bebra' };

    const newUser = await usersRepository.createOne(dto);

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(newUser).has.keys('id', 'email', 'name', 'updatedAt', 'createdAt');
    expect(newUser.id).to.be.an('string');
  });
  it('should update user', async () => {
    const updateDto = { name: 'Bebra Bebrovich' };

    const targetUser = mockUsers[0];
    const updatedUser = await usersRepository.updateOne(
      targetUser.id,
      updateDto
    );

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(updatedUser.name).to.be.equal(updateDto.name);
  });
  it('should delete user', async () => {
    const targetUser = mockUsers[0];
    const deleteResult = await usersRepository.deleteOne(targetUser.id);

    expect(fakeGetRepository.callCount).to.be.equal(1);
    expect(deleteResult).to.be.an('boolean').and.equal(true);
  });
});
