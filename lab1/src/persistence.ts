import { appendFile, readFile, writeFile } from 'fs/promises';
import { DB_PATH } from './constants';
import { CreatePostDto, Post, UpdatePostDto } from './types';

export async function getAllPosts(): Promise<Post[]> {
  try {
    const file = await readFile(DB_PATH);
    const fileContent = file.toString();

    if (!fileContent) {
      return [];
    }

    const posts: Post[] = JSON.parse(fileContent);

    return posts;
  } catch (e) {
    throw e;
  }
}

export async function getSinglePost(id: number): Promise<Post | undefined> {
  try {
    const file = await readFile(DB_PATH);
    const fileContent = file.toString();

    if (!fileContent) {
      return undefined;
    }

    const posts: Post[] = JSON.parse(fileContent);
    const post = posts.find((x) => x.id === id);

    return post;
  } catch (e) {
    throw e;
  }
}

export async function createPost(createPost: CreatePostDto): Promise<Post> {
  try {
    const file = await readFile(DB_PATH);
    const fileContent = file.toString();

    const createdPost: Post = { 
      id: new Date().getTime(),
      content: createPost.content,
      createdAt: createPost.createdAt,
      updatedAt: createPost.createdAt
    };

    if (!fileContent) {
      await appendFile(DB_PATH, JSON.stringify(createdPost));
      return createdPost;
    }

    const posts : Post[] = JSON.parse(fileContent);
    posts.push(createdPost);
    await writeFile(DB_PATH, JSON.stringify(posts));
    return createdPost;
  } catch (e) {
    throw e;
  }
}

export async function updatePost(id: number, updatePost: UpdatePostDto): Promise<Post> {
  try {
    const file = await readFile(DB_PATH);
    const fileContent = file.toString();

    const posts : Post[] = JSON.parse(fileContent)
    
    const toUpdatePost = posts.find((x) => x.id === id);

    if(!toUpdatePost) {
      throw("404");
    }

    const updatedPost : Post = {
      id: toUpdatePost.id,
      content: updatePost.content,
      createdAt: toUpdatePost.createdAt,
      updatedAt: updatePost.updatedAt
    }

    const toUpdatePosts = posts.filter((x) => x.id !== id);
    toUpdatePosts.push(updatedPost);
    const res = await writeFile(DB_PATH, JSON.stringify(toUpdatePosts));

    return updatedPost;
  } catch (e) {
    throw e;
  }
}

export async function deletePost(id: number): Promise<boolean> {
  try {
    const file = await readFile(DB_PATH);
    const fileContent = file.toString();

    const posts : Post[] = JSON.parse(fileContent)

    const newPosts = posts.filter(x => x.id !== id);
    const res = await writeFile(DB_PATH, JSON.stringify(newPosts))

    return true;
  } catch (e) {
    throw e;
  }
}