export interface EntityRepository<T extends { id: string }> {
  findAll(): Promise<T[]>;
  findOne(id: T['id']): Promise<T>;
  createOne(partialEntity: Partial<T>): Promise<T>;
  updateOne(id: T['id'], partialEntity: Partial<T>): Promise<T>;
  deleteOne(id: T['id']): Promise<boolean>;
}
