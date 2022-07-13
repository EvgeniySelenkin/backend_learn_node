import { Connection, createConnection } from 'typeorm';
import { DB_URL } from '../config';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

export let dbConnection: Connection;

if (process.env.NODE_ENV !== 'test') {
  createConnection({
    type: 'postgres',
    url: DB_URL,
    entities: [User, Post],
    synchronize: true,
    logging: true,
  })
    .then((connection) => {
      dbConnection = connection;
    })
    .catch((error) => {
      console.error(`TypeORM create connection error:`, error);
      throw error;
    });
} else {
  //for tests
  dbConnection = {
    getRepository: () => {},
  } as any;
}
