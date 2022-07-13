import { User } from '../users';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { postsRepository } from './posts.repository';

class PostsService {
  async getAllPosts(): Promise<Post[]> {
    return postsRepository.findAll();
  }

  async getOnePost(id: Post['id']): Promise<Post> {
    return postsRepository.findOne(id);
  }

  async createPost(dto: CreatePostDto): Promise<Post> {
    return postsRepository.createOne(dto);
  }

  async updatePost(id: Post['id'], dto: UpdatePostDto): Promise<Post> {
    return postsRepository.updateOne(id, dto);
  }

  async deletePost(id: Post['id']): Promise<boolean> {
    return postsRepository.deleteOne(id);
  }

  async getPostAuthor(id: Post['id']): Promise<User> {
    return postsRepository.authorByPostId(id);
  }
}

export const postsService = new PostsService();
