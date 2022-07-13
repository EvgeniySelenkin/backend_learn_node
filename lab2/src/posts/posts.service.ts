import { PostEntity } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { postsRepository } from './posts.repository';

/**
 * Удобно вынести все эти методы в класс и затем реализовать паттерн Singleton
 * Почему Singleton? Потому, что несколько объектов одного сервиса иметь бессмысленно
 * https://refactoring.guru/ru/design-patterns/singleton
 */
class PostsService {
  async getAllPosts(): Promise<PostEntity[]> {
    /**
     * Делаю нужный запрос в репозиторий.
     * Понятия не имею что происходит в репозитории -- значит абстракция сделана гуд
     */
    return postsRepository.findAll();
  }

  async getOnePost(id: PostEntity['id']): Promise<PostEntity> {
    return postsRepository.findOne(id);
  }

  async createPost(dto: CreatePostDto): Promise<PostEntity> {
    return postsRepository.createOne(dto);
  }

  async updatePost(
    id: PostEntity['id'],
    dto: UpdatePostDto
  ): Promise<PostEntity> {
    return postsRepository.updateOne(id, dto);
  }

  async deletePost(id: PostEntity['id']): Promise<boolean> {
    return postsRepository.deleteOne(id);
  }
}

/**
 * Экспортирую Singleton
 */
export const postsService = new PostsService();
