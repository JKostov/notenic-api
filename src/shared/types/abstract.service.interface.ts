
export interface IService<TEntity> {
  getById(id: string): Promise<TEntity>;
  getAll(): Promise<TEntity[]>;
  create(entity: TEntity): Promise<TEntity>;
}
