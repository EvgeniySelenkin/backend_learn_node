import bodyParser from 'body-parser';
import express from 'express';
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from './persistence';
import { CreatePostDto, UpdatePostDto } from './types';

const PORT = 3000;

/**
 * Создаем Express-сервер
 */
export const app = express();

/**
 * Это мидлвара, которая позволяет читать BODY, который передали как JSON-объект
 */
app.use(bodyParser.json());

/**
 * Пример одного эдпоинта, используйте его как образец
 */
app.get('/posts', async (_, res) => {
  const posts = await getAllPosts();

  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = await getSinglePost(+req.params.id);
  if (!post) {
    res.sendStatus(404);
  } else {
    res.json(post);
  }
});

app.post('/posts', async (req, res) => {
  const content = req.body.content;
  const newPost : CreatePostDto = {
    content: content,
    createdAt: new Date().toISOString()
  }
  const post = await createPost(newPost);

  res.json(post);
});

app.patch('/posts/:id', async (req, res) => {
  const content = req.body.content;
  const updatedPost : UpdatePostDto = {
    content: content,
    updatedAt: new Date().toISOString()
  }
  const post = await updatePost(+req.params.id, updatedPost);
  res.json(post);
});

app.delete('/posts/:id', async (req, res) => {
  const result = await deletePost(+req.params.id);

  res.json(result);
});


/**
 * Чтобы во время тестов ваше запущенное приложение не конфликтовало
 *  с тем, которое поднимается для тестов
 */
if (process.env.NODE_ENV !== 'test') {
  /**
   * Обратите внимание что делает этот метод -- мы подписываемся на весь трафик
   *  с порта 3000, "слушаем его"
   */
  app.listen(PORT, () => {
    console.log(`Express application started on http://localhost:${PORT}`);
  });
}
