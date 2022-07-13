import { UserEntity } from './user.entity';

export type CreateUserDto = Pick<UserEntity, 'email' | 'name' | 'age' | 'phone'>;
export type UpdateUserDto = Partial<CreateUserDto>;
