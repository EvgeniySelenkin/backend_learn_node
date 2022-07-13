import { User } from '.';

export type CreateUserDto = Pick<User, 'name' | 'age' | 'email' | 'phone'>;
export type UpdateUserDto = Partial<CreateUserDto>;
