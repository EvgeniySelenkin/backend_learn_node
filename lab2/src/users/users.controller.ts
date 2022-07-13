import { Router } from 'express';
import { usersService } from './users.service';

/**
 * https://expressjs.com/ru/4x/api.html#router
 * С помощью роутера мы можем создать контроллер для ресурса
 */
export const usersController = Router();

/**
 * Для роутера хэндлеры запросов пишут так же как для основного express-сервера
 */
 usersController.get('/users', async (_, res) => {
  /**
   * Обратите внимание, что контроллер просто передает управление сервису
   *  и в конце отправляет результат клиенту
   */
  const users = await usersService.getAllPosts();

  res.json(users);
});

usersController.get('/users/:id', async (req, res) => {
  try {
    const user = await usersService.getOneUser(req.params.id);

    res.json(user);
  } catch (e) {
    res.sendStatus(404);
  }
});

usersController.post('/users', async (req, res) => {
  const users = await usersService.createUser(req.body);

  res.json(users);
});

usersController.patch('/users/:id', async (req, res) => {
  const updatedUser = await usersService.updateUser(req.params.id, req.body);

  res.json(updatedUser);
});

usersController.delete('/users/:id', async (req, res) => {
  const isUserDeleted = await usersService.deleteUser(req.params.id);

  res.json(isUserDeleted);
});
