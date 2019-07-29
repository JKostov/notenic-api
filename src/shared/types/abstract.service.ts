import { Repository } from 'typeorm';
import { IService } from '@app/shared/types/abstract.service.interface';

export abstract class AbstractService<TEntity> implements  IService<TEntity> {
  protected constructor(protected readonly repository: Repository<TEntity>) { }

  async getById(id: string): Promise<TEntity> {
    return await this.repository.findOne(id);
  }

  async getAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }

  async create(entity: TEntity): Promise<TEntity> {
    return await this.repository.save(entity);
  }
}
