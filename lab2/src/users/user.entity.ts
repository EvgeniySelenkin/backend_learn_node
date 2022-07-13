/**
 * Сущность нашего поста.
 * Сущность -- это элемент предметной области и через этот тип мы его описываем.
 */
export type UserEntity = {
  /**
   * Сделаем UUID как ID, в этот раз
   * Посмотрите реализацию createOne в posts/posts.repository.ts
   */
  id: string;
  email: string,
  name: string,
  age?: number,
  phone?: string,
  updatedAt: string;
  createdAt: string;
};
