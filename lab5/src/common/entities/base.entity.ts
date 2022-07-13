import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {

  @UpdateDateColumn()
  updatedAt: string;

  @CreateDateColumn()
  createdAt: string;
}
