import { UserEntity } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { usersRepository } from './users.repository';

/**
 * Удобно вынести все эти методы в класс и затем реализовать паттерн Singleton
 * Почему Singleton? Потому, что несколько объектов одного сервиса иметь бессмысленно
 * https://refactoring.guru/ru/design-patterns/singleton
 */
class UsersService {
  async getAllPosts(): Promise<UserEntity[]> {
    /**
     * Делаю нужный запрос в репозиторий.
     * Понятия не имею что происходит в репозитории -- значит абстракция сделана гуд
     */
    return usersRepository.findAll();
  }

  async getOneUser(id: UserEntity['id']): Promise<UserEntity> {
    return usersRepository.findOne(id);
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    return usersRepository.createOne(dto);
  }

  async updateUser(
    id: UserEntity['id'],
    dto: UpdateUserDto
  ): Promise<UserEntity> {
    return usersRepository.updateOne(id, dto);
  }

  async deleteUser(id: UserEntity['id']): Promise<boolean> {
    return usersRepository.deleteOne(id);
  }
}

/**
 * Экспортирую Singleton
 */
export const usersService = new UsersService();
