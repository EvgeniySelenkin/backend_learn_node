import { dbConnection } from '../database/database.config';
import { EntityRepository } from '../interfaces';
import { User } from '../users';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './posts.dto';

/**
 * Тут все методы сами описываете, референс с UsersRepository
 */
class PostsRepository implements EntityRepository<Post> {
    async findAll(): Promise<Post[]> {
        try {
          /**
           * Соединение с БД лежит в обычной переменной
           * Чтобы достать репозиторий для сущности вызываю метод getRepository
           * Далее работаю уже с методами репозитория
           * Потыкайте все методы репозитория, их названия очень интуитивные
           * find, findOne, save, delete, update и проч
           */
          return dbConnection.getRepository(Post).find();
        } catch (e) {
          throw e;
        }
      }
    
      async findOne(id: Post['id']): Promise<Post> {
        try {
          const post = await dbConnection.getRepository(Post).findOne(id);
          if (post) {
            return post;
          } else {
            throw new Error("404")
          }
        } catch (e) {
          throw e;
        }
      }
    
      async createOne(partialEntity: CreatePostDto): Promise<Post> {
        try {
          return dbConnection.getRepository(Post).save(partialEntity);
        } catch (e) {
          throw e;
        }
      }
    
      async updateOne(id: Post['id'], partialEntity: UpdatePostDto): Promise<Post> {
        try {
          return dbConnection.getRepository(Post).save({id, ...partialEntity});
        } catch (e) {
          throw e;
        }
      }
    
      async deleteOne(id: Post['id']): Promise<boolean> {
        try {
          await dbConnection.getRepository(Post).delete(id);
          return true;
        } catch (e) {
          throw e;
        }
      }

      async findByUserId(id: User['id']): Promise<Post[]> {
          try {
              return dbConnection.getRepository(Post).find({where: {authorId: id}});
          } catch (e) {
              throw e;
          }
      }

      async authorByPostId(id: Post['id']): Promise<User> {
          try {
              const post = await dbConnection.getRepository(Post).findOne(id);
              const author = post?.author;
              if (author) {
                  return author;
              } else {
                  throw new Error("404");
              }
          } catch (e) {
              throw e;
          }
      }
}

export const postsRepository = new PostsRepository();
