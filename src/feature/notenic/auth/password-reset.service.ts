import { Injectable } from '@nestjs/common';
import { IPasswordResetService } from './password-reset.service.interface';
import { DatabaseFactory } from '../database/database.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordReset } from './password-reset.entity';
import { AbstractService } from '@app/shared/types/abstract.service';
import { User } from '@notenic/user/user.entity';

@Injectable()
export class PasswordResetService extends AbstractService<PasswordReset> implements IPasswordResetService {
  constructor(@InjectRepository(PasswordReset, DatabaseFactory.connectionName) passwordResetRepository: Repository<PasswordReset>) {
    super(passwordResetRepository);
  }

  async clearExistingAndCreateNewForUser(user: User): Promise<PasswordReset> {
    await this.repository.createQueryBuilder()
      .where('user.id = :user', { user: user.id })
      .delete()
      .execute();

    const pr = new PasswordReset();
    pr.user = user;

    return await this.repository.save(pr);
  }

  async deleteByIdAndUser(id: string, user: User): Promise<PasswordReset> {
    const pr = await this.repository.findOne({ id, user });

    return await this.repository.remove(pr);
  }
}
