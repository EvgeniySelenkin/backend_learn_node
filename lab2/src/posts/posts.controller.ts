import { Router } from 'express';
import { postsService } from './posts.service';

/**
 * https://expressjs.com/ru/4x/api.html#router
 * С помощью роутера мы можем создать контроллер для ресурса
 */
export const postsController = Router();

/**
 * Для роутера хэндлеры запросов пишут так же как для основного express-сервера
 */
postsController.get('/posts', async (_, res) => {
  /**
   * Обратите внимание, что контроллер просто передает управление сервису
   *  и в конце отправляет результат клиенту
   */
  const posts = await postsService.getAllPosts();

  res.json(posts);
});

postsController.get('/posts/:id', async (req, res) => {
  try {
    const post = await postsService.getOnePost(req.params.id);

    res.json(post);
  } catch (e) {
    res.sendStatus(404);
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
