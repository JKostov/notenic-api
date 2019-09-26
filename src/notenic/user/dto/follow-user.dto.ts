import { IsString } from 'class-validator';

export class FollowUserDto {
  @IsString()
  userId: string;
}
