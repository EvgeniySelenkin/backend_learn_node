import { randomUUID } from 'crypto';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { EntityRepository } from '../interfaces';
import { UserEntity } from './user.entity';

/**
 * Имплементируем интерфейс базового репозитория с базовыми методами
 *  через дженерик укажем для какой сущности делаем репозиторий,
 *  чтобы упростить типизацию
 */
class UsersRepository implements EntityRepository<UserEntity> {
  /**
   * В закрытое поле положим путь до нашей БД
   * В этот раз используем JSON, вместо TXT из первой лабы
   */
  private readonly dbPath = join('database/users.json');

  /**
   * Обратите внимание какая хорошая у нас абстракция. Наружу торчит метод findAll
   *  а внутри идет чтение из файла (!), ужас. Бедный сервис и не догадывается, что
   *  наша БД лежит в файле, он думает, что у нас есть PostgreSQL...
   */
  async findAll(): Promise<UserEntity[]> {
    try {
      const file = await readFile(this.dbPath);
      const fileContent = file.toString();

      if (!fileContent) {
        return [];
      }

      const users: UserEntity[] = JSON.parse(fileContent);

      return users;
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    try {
      const allPosts = await this.findAll();
      const searchedUser = allPosts.find((user) => user.id === id);

      if (!searchedUser) {
        throw new Error(`В базе данных нету юзера с ID ${id}`);
      }

      return searchedUser;
    } catch (e) {
      throw e;
    }
  }

  async createOne(partialEntity: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const allUsers = await this.findAll();
      const newUser = {
        ...partialEntity,
        id: randomUUID(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      } as UserEntity;

      const withNewUser = allUsers ? [...allUsers, newUser] : [newUser];

      await writeFile(this.dbPath, JSON.stringify(withNewUser));

      return newUser;
    } catch (e) {
      throw e;
    }
  }

  async updateOne(
    id: string,
    partialEntity: Partial<UserEntity>
  ): Promise<UserEntity> {
    try {
      const allUsers = await this.findAll();
      const updatedUser = allUsers.find((user) => user.id === id) as UserEntity;

      const afterUpdate = {
        ...updatedUser,
        ...partialEntity,
        updatedAt: new Date().toISOString(),
      } as UserEntity;

      const updatedUsers = allUsers.map((user) =>
        user.id === id ? afterUpdate : user
      );

      await writeFile(this.dbPath, JSON.stringify(updatedUsers));

      return afterUpdate;
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: string): Promise<boolean> {
    try {
      const allUsers = await this.findAll();
      const withoutDeleted = allUsers.filter((user) => user.id !== id);

      await writeFile(this.dbPath, JSON.stringify(withoutDeleted));

      return true;
    } catch (e) {
      return false;
    }
  }
}

/**
 * Экспортирую Singleton
 */
export const usersRepository = new UsersRepository();
