import { Post } from './post.entity';

export type CreatePostDto = Pick<Post, 'content' | 'authorId'>;
export type UpdatePostDto = Partial<Post>;
