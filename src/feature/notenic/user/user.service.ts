import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@notenic/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DatabaseFactory } from '../database/database.factory';
import { IUserService } from './user.service.interface';
import { AbstractService } from '@app/shared/types/abstract.service';

const userNotFoundMessage = 'User not found.';

@Injectable()
export class UserService extends AbstractService<User> implements IUserService {
  constructor(@InjectRepository(User, DatabaseFactory.connectionName) usersRepository: Repository<User>) {
    super(usersRepository);
  }

  async getOneByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }

  async getOneByUsername(username: string): Promise<User> {
    return await this.repository.findOne({ where: { username } });
  }

  async create(user: User): Promise<User> {
    const existing = await this.repository.createQueryBuilder('u')
      .where('u.email = :email', { email: user.email })
      .orWhere('u.username = :username', { username: user.username })
      .getOne();

    if (existing) {
      const existingUsername = user.username === existing.username;
      throw new HttpException(`${existingUsername ? 'Username' : 'Email address'} alredy taken.`, HttpStatus.BAD_REQUEST);
    }

    return await this.repository.save(user);
  }

  async deleteByEmail(email: string): Promise<User> {
    const user = await this.getOneByEmail(email);

    if (!user) {
      throw new HttpException(userNotFoundMessage, HttpStatus.BAD_REQUEST);
    }

    await this.repository.remove(user);

    return user;
  }

  async verifyRegistrationByEmail(email: string): Promise<User> {
    const user = await this.getOneByEmail(email);

    user.registrationToken = null;
    user.enabled = true;

    return await this.repository.save(user);
  }

  async updatePassword(user: User, password: string): Promise<User> {
    user.password = password;
    return await this.repository.save(user);
  }

  async getUserInfoWithNotes(username: string, loadPrivateNotes: boolean): Promise<User> {
    const pub = [true];
    if (loadPrivateNotes) {
      pub.push(false);
    }

    const user = await this.repository.createQueryBuilder('u')
      .select(['u.id', 'u.gender', 'u.education', 'u.work', 'u.about', 'note.id', 'note.image', 'note.likes', 'note.tags', 'note.title',
        'note.createdAt', 'u.username', 'u.firstName', 'u.lastName', 'u.createdAt', 'comment.id'])
      .leftJoin('u.notes', 'note', 'note.public IN (:...pub)', { pub })
      .leftJoin('note.comments', 'comment')
      .where('u.username = :username', { username })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
