import { Router } from 'express';
import { postsService } from './posts.service';

export const postsController = Router();

postsController.get('/posts', async (_, res) => {
  const posts = await postsService.getAllPosts();

  res.json(posts);
});

postsController.get('/posts/:id', async (req, res) => {
  try {
    const post = await postsService.getOnePost(req.params.id);

    res.json(post);
  } catch (e) {
    res.sendStatus(500);
  }
});

postsController.get('/posts/:id/author', async (req, res) => {
  try {
    const author = await postsService.getPostAuthor(req.params.id);

    res.json(author);
  } catch (e) {
    res.sendStatus(500);
  }
});

postsController.post('/posts', async (req, res) => {
  const posts = await postsService.createPost(req.body);

  res.json(posts);
});

postsController.patch('/posts/:id', async (req, res) => {
  const updatedPost = await postsService.updatePost(req.params.id, req.body);

  res.json(updatedPost);
});

postsController.delete('/posts/:id', async (req, res) => {
  const isPostDeleted = await postsService.deletePost(req.params.id);

  res.json(isPostDeleted);
});
