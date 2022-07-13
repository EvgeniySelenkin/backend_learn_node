import { randomUUID } from 'crypto';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { EntityRepository } from '../interfaces';
import { PostEntity } from './post.entity';

/**
 * Имплементируем интерфейс базового репозитория с базовыми методами
 *  через дженерик укажем для какой сущности делаем репозиторий,
 *  чтобы упростить типизацию
 */
class PostsRepository implements EntityRepository<PostEntity> {
  /**
   * В закрытое поле положим путь до нашей БД
   * В этот раз используем JSON, вместо TXT из первой лабы
   */
  private readonly dbPath = join('database/posts.json');

  /**
   * Обратите внимание какая хорошая у нас абстракция. Наружу торчит метод findAll
   *  а внутри идет чтение из файла (!), ужас. Бедный сервис и не догадывается, что
   *  наша БД лежит в файле, он думает, что у нас есть PostgreSQL...
   */
  async findAll(): Promise<PostEntity[]> {
    try {
      const file = await readFile(this.dbPath);
      const fileContent = file.toString();

      if (!fileContent) {
        return [];
      }

      const posts: PostEntity[] = JSON.parse(fileContent);

      return posts;
    } catch (e) {
      throw e;
    }
  }

  async findOne(id: string): Promise<PostEntity> {
    try {
      const allPosts = await this.findAll();
      const searchedPost = allPosts.find((post) => post.id === id);

      if (!searchedPost) {
        throw new Error(`В базе данных нету поста с ID ${id}`);
      }

      return searchedPost;
    } catch (e) {
      throw e;
    }
  }

  async createOne(partialEntity: Partial<PostEntity>): Promise<PostEntity> {
    try {
      const allPosts = await this.findAll();
      const newPost = {
        ...partialEntity,
        id: randomUUID(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      } as PostEntity;

      const withNewPost = allPosts ? [...allPosts, newPost] : [newPost];

      await writeFile(this.dbPath, JSON.stringify(withNewPost));

      return newPost;
    } catch (e) {
      throw e;
    }
  }

  async updateOne(
    id: string,
    partialEntity: Partial<PostEntity>
  ): Promise<PostEntity> {
    try {
      const allPosts = await this.findAll();
      const updatedPost = allPosts.find((post) => post.id === id) as PostEntity;

      const afterUpdate = {
        ...updatedPost,
        ...partialEntity,
        updatedAt: new Date().toISOString(),
      } as PostEntity;

      const updatedPosts = allPosts.map((post) =>
        post.id === id ? afterUpdate : post
      );

      await writeFile(this.dbPath, JSON.stringify(updatedPosts));

      return afterUpdate;
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(id: string): Promise<boolean> {
    try {
      const allPosts = await this.findAll();
      const withoutDeleted = allPosts.filter((post) => post.id !== id);

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
export const postsRepository = new PostsRepository();
