# Лабораторная работа №1

## Тема: NodeJS. CRUD. ExpressJS.

<br/>

Максимальный балл за лабораторную работу -- 10 баллов.

## Описание лабы:

Эта лабораторная работа посвящена знакомству с NodeJS и заодно напишем свой первый веб-сервер. Мы будем знакомиться с Node на примере библиотеки для создания серверов -- ExpressJS. Express это стандарт в области NodeJS-серверов, старый и претерпевший ни одно приложение.

В этой лабораторной мы будем делать API для приложения, в котором есть статьи, создание статей, их обновление и удаление. В итоге, у вас должно получиться 5 эндпоинтов: получить все посты, получить один пост, создать пост, обновить и удалить пост.

Как хранилище данных будем использовать файл database.txt. Как в него записывать данные и использовать его как БД -- это задача к вам. Подсказка, используйте JSON.stringify/JSON.parse при чтении/записи.

## Ресурсы:

1. [Express basic routing](https://expressjs.com/ru/starter/basic-routing.html)
2. [NodeJS File API](https://nodejs.dev/learn/the-nodejs-fs-module)
3. [Testing API with Postman](https://www.softwaretestinghelp.com/api-testing-using-postman/#POSTMAN_Introduction)
4. [Building REST API with Express](https://www.robinwieruch.de/node-express-server-rest-api/)

## ❗️ <b>Перед выполнением</b>:

1. проверьте, что у вас установлен npm на машине (можно запустить команду npm -v);
2. когда склонируете этот репозиторий запустите команды: npm i -g yarn (установится глобальная переменная yarn), затем yarn install (установятся зависимости для проекта);
3. <b>чтобы запустить проект напишите yarn start, должен открыться браузер на странице localhost:3000</b>

## Задания:

✅ Описать DTO-типы для создания и обновления поста (src/types.ts):

1. подумайте, что нам нужно для создания и обновления поста, учитывая что у вас уже есть тип самого поста.

🔎 Критерий приемки: я вижу в src/types.ts DTO типы.

✅ Опишите все функции нужные для работы с БД (src/persistence.ts):

1. подумайте какие нужны функции для работы с нашей текстовой БД и опишите их. Мы хотим хранить эти функции в отдельном файле, чтобы таким образом создать абстракцию между эндпоинтом и слоем хранения данных.

🔎 Критерий приемки: вы описали все нужные функции для работы с БД.

✅ Опишите все 5 эндпоинтов приложения:

1. опишите все 5 эндпоинтов, которые есть в нашем приложении (см. описание лабы).

🔎 Критерий приемки: ваш код проходит тесты.
