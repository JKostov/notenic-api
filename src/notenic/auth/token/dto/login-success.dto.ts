import { User } from '../../../user/user.entity';

export class LoginSuccessDto {
  user: User;
  token: string;
}
