import { randomUUID } from 'crypto';
import { Post } from '../src/posts';
import { User } from '../src/users';

export const createFakePosts = (count: number): Post[] => {
  return [...new Array(count)].map((_, index) => ({
    id: randomUUID(),
    content: `Post #${index}`,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }));
};

export const createFakeUsers = (count: number): User[] => {
  return [...new Array(count)].map((_, index) => ({
    id: randomUUID(),
    email: `john_doe_${index}@gmail.com`,
    name: `John Doe #${index}`,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  }));
};

export function promisify<T>(value: T): Promise<T> {
  return new Promise((resolve) => resolve(value));
}
