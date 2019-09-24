import { PasswordReset } from './password-reset.entity';
import { IService } from '@app/shared/types/abstract.service.interface';
import { User } from '@notenic/user/user.entity';

export interface IPasswordResetService extends IService<PasswordReset> {
  clearExistingAndCreateNewForUser(user: User): Promise<PasswordReset>;

  deleteByIdAndUser(id: string, user: User): Promise<PasswordReset>;
}
