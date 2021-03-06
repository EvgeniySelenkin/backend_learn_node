# Лабораторная работа №3

## Тема: TypeORM, PostgreSQL.

<br/>

Максимальный балл за лабораторную работу -- 10 баллов.

## Описание лабы:

В этой лабораторной работе мы познакомимся с библиотекой TypeORM. TypeORM предоставляет нам API для работы с базой данных. TypeORM упрощает работу с базой в том смысле, что нам не приходится в большей части случаев писать SQL-команды руками -- мы все это делаем через QueryBuilder -- составитель SQL запроса, который является JavaScript-объектом.

Возможности TypeORM на этом не заканчиваются. С помощью TypeORM мы можем работать со схемой БД, создавать миграции (см. в гуголе), создавать views и многое другое. Любая ORM сильно упрощает работу с базой данных, когда вы пишите код вашего бэкенда -- TypeORM не исключение.

За эту лабораторную работу мы должны научиться:

1. создавать connection к базе через TypeORM;
2. познакомиться с repository-подходом при работе с базой;
3. освоить основные методы у репозиториев в TypeORM.

## Ресурсы:

1. [Как подключиться к базе через TypeORM](https://typeorm.io/#/connection)
2. [Entity в TypeORM](https://typeorm.io/#/entities)
3. [Связывание сущностей через реляции](https://typeorm.io/#/relations)
4. [Репозиторий в TypeORM](https://typeorm.io/#/working-with-repository)
5. [Repository API](https://typeorm.io/#/repository-api)
6. [Синхронизация схемы БД в TypeORM](https://github.com/typeorm/typeorm/blob/master/docs/faq.md#how-do-i-update-a-database-schema)

## ❗️ <b>Перед выполнением</b>:

1. проверьте, что у вас установлен npm на машине (можно запустить команду npm -v);
2. когда склонируете этот репозиторий запустите команды: npm i -g yarn (установится глобальная переменная yarn), затем yarn install (установятся зависимости для проекта);
3. <b>чтобы запустить проект напишите yarn start, должен открыться браузер на странице localhost:3000</b>

## Задания:

✅ Создайте бесплатную базу данных на ресурсе Elephant SQL:

1. зарегистрируйтесь, создайте бесплатную базу, возьмите от нее креды. Для этой лабы нам понадобится только URL -- разберитесь что такое database url и из чего он состоит.

🔎 Критерий приемки: у вас есть база данных на Elephant SQL.

✅ Создайте TypeORM connection к базе данных с помощью environment variable DB_URL:

1. научитесь задавать переменные окружения для своего проекта -- креды от нашей БД это sensitive информация, которую мы должны скрывать и не хранить в коде репозитория;
2. создайте TypeORM connection к вашей бд, используйте database url из первого пункта. Делайте эту часть в файле database/database.config.ts

🔎 Критерий приемки: вы знаете что такое переменные окружения и можете создать соединение с вашей БД через TypeORM.

✅ Создайте Entities для User и Post:

1. замените type User и type Post на TypeORM Entities (для примера см. user entity);

🔎 Критерий приемки: в вашей базе есть таблицы для юзеров и постов.

✅ Изменить методы репозиториев из 2 лабы, чтобы они использовали БД, а не текстовый файл. И дописать недостающие методы (getUserPosts, getPostAuthor):

1. изменяете все методы ваших репозиториев так, чтобы не было persistance-слоя в файлах -- отныне все данные хранятся в БД. Не отправляйте "сырые" запросы к базе, используйте TypeORM entity repository (обратите внимание на реализацию в users.repository.ts);
2. допишите недостающие методы в репозиториях getUserPosts -- хочу все посты юзера; getPostAuthor -- хочу объект с автором поста.
3. **я рассчитываю, что вы будете использовать только стандартные методы репозиториев (find, findOne, save, update, delete) -- поэтому тесты будут проходить только с использованием этих методов.**

🔎 Критерий приемки: ваш код проходит все тесты.
