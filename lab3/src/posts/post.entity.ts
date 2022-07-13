import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

const tableName = 'posts';
/**
 * Сущность поста делайте сами, опирайтесь на пример User Entity
 */
 @Entity({ name: tableName })
export class Post {
  /**
   * Не забудьте, что у поста есть автор!
   * Вам нужно связать две сущности
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  author?: User;

  authorId?: string;

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}