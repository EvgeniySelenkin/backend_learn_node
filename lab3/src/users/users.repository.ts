import { dbConnection } from '../database/database.config';
import { EntityRepository } from '../interfaces';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

/**
 * Допишите оставшиеся методы учитывая пример с findAll
 */
class UsersRepository implements EntityRepository<User> {
  async findAll(): Promise<User[]> {
    try {
      /**
       * Соединение с БД лежит в обычной переменной
       * Чтобы достать репозиторий для сущности вызываю метод getRepository
       * Далее работаю уже с методами репозитория
       * Потыкайте все методы репозитория, их названия очень интуитивные
       * find, findOne, save, delete, update и проч
       */
      return dbConnection.getRepository(User).find();
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: User['id']): Promise<User> {
    try {
      const user = await dbConnection.getRepository(User).findOne(id);
      if (user) {
        return user;
      } else {
        throw new Error("404")
      }
    } catch (e) {
      throw e;
    }
  }

  async createOne(partialEntity: CreateUserDto): Promise<User> {
    try {
      return dbConnection.getRepository(User).save(partialEntity);
    } catch (e) {
      throw e;
    }
  }

  async updateOne(id: User['id'], partialEntity: UpdateUserDto): Promise<User> {
    try {
      return dbConnection.getRepository(User).save({id, ...partialEntity});
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: User['id']): Promise<boolean> {
    try {
      await dbConnection.getRepository(User).delete(id);
      return true;
    } catch (e) {
      throw e;
    }
  }
}

export const usersRepository = new UsersRepository();
