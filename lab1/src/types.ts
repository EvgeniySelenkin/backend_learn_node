export type Post = {
  id: number;
  content: string;
  updatedAt: string;
  createdAt: string;
};

export type CreatePostDto = {
  content: string;
  createdAt: string;
};

export type UpdatePostDto = {
  content: string;
  updatedAt: string;
};
