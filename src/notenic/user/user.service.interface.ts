import { User } from './user.entity';
import { IService } from '@app/shared/types/abstract.service.interface';
import { UpdateUserDto } from '@notenic/user/dto/update-user.dto';
import { FollowUserDto } from '@notenic/user/dto/follow-user.dto';
import { Note } from '@notenic/note/note.entity';

export interface IUserService extends IService<User> {
  getOneByEmail(email: string): Promise<User>;

  getOneByEmailComplete(email: string): Promise<User>;

  getOneByUsername(username: string): Promise<User>;

  verifyRegistrationByEmail(email: string): Promise<User>;

  deleteByEmail(email: string): Promise<User>;

  updatePassword(user: User, password: string): Promise<User>;

  getUserInfoWithNotes(username: string, loadPrivateNotes: boolean): Promise<User>;

  updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User>;

  getByIdPublic(userId: string): Promise<User>;

  followUser(user: User, followUserDto: FollowUserDto): Promise<User>;

  bookmarkNote(user: User, note: Note): Promise<void>;

  getFollowingUsersForUser(user: User): Promise<User[]>;

  getUsersByIds(ids: string[]): Promise<User[]>;

  checkUserCollaboration(user: User, collaborationId: string): Promise<boolean>;
}
