import bodyParser from 'body-parser';
import express from 'express';
import { postsController } from './posts';
import { usersController } from './users';

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
 * Таким образом мы подключаем контроллер к express-серверу, чтобы контроллер
 *  перехватывал запросы на свои пути
 */
app.use(postsController);

app.use(usersController);

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
