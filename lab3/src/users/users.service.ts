import { Post, postsRepository } from '../posts';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { usersRepository } from './users.repository';

class UsersService {
  async getAllPosts(): Promise<User[]> {
    return usersRepository.findAll();
  }

  async getOnePost(id: User['id']): Promise<User> {
    return usersRepository.findOne(id);
  }

  async getUserPosts(id: User['id']): Promise<Post[]> {
    return postsRepository.findByUserId(id);
  }

  async createPost(dto: CreateUserDto): Promise<User> {
    return usersRepository.createOne(dto);
  }

  async updatePost(id: User['id'], dto: UpdateUserDto): Promise<User> {
    return usersRepository.updateOne(id, dto);
  }

  async deletePost(id: User['id']): Promise<boolean> {
    return usersRepository.deleteOne(id);
  }
}

export const usersService = new UsersService();
