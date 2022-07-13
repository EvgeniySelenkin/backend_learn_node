import { Router } from 'express';
import { usersService } from './users.service';

export const usersController = Router();

usersController.get('/users', async (_, res) => {
  const posts = await usersService.getAllPosts();

  res.json(posts);
});

usersController.get('/users/:id', async (req, res) => {
  try {
    const post = await usersService.getOnePost(req.params.id);

    res.json(post);
  } catch (e) {
    res.sendStatus(404);
  }
});

usersController.get('/users/:id/posts', async (req, res) => {
  try {
    const post = await usersService.getUserPosts(req.params.id);

    res.json(post);
  } catch (e) {
    res.sendStatus(404);
  }
});

usersController.post('/users', async (req, res) => {
  const posts = await usersService.createPost(req.body);

  res.json(posts);
});

usersController.patch('/users/:id', async (req, res) => {
  const updatedPost = await usersService.updatePost(req.params.id, req.body);

  res.json(updatedPost);
});

usersController.delete('/users/:id', async (req, res) => {
  const isPostDeleted = await usersService.deletePost(req.params.id);

  res.json(isPostDeleted);
});
