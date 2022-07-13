import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';

const tableName = 'users';

/**
 * Этот декоратора создает сущность (таблицу в БД).
 * В параметрах можем указать кастомное название для таблицы
 */
@Entity({ name: tableName })
export class User {
  /**
   * Хочу Primary ключ как uuid
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Создастся колонка с обычным текстом
   */
  @Column('varchar')
  email: string;

  @Column('varchar')
  name: string;

  /**
   * Создастся колонка с типом int
   */
  @Column('int')
  age?: number;

  @Column('varchar')
  phone?: string;

  /**
   * Задача для вас -- нужно связать User и Posts.
   * Подумайте какая тут связь? М:М, 1:М или М:1?
   * Используйте нужный декоратор (см. документацию TypeORM Relations)
   */
  @OneToMany(() => Post, (post) => post.id)
  posts?: Post[];

  /**
   * Создастся колонка в которой будет логироваться последнее изменение записи
   */
  @UpdateDateColumn()
  updatedAt: string;

  /**
   * Создастся колонка в которой будет логироваться время создания записи
   */
  @CreateDateColumn()
  createdAt: string;
}
