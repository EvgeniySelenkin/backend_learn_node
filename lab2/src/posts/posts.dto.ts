import { PostEntity } from './post.entity';

export type CreatePostDto = Pick<PostEntity, 'content'>;
export type UpdatePostDto = Partial<CreatePostDto>;
