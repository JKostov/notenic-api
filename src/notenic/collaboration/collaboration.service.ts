import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ICollaborationService } from '@notenic/collaboration/collaboration.service.interface';
import { AbstractService } from '@app/shared/types/abstract.service';
import { Collaboration } from '@notenic/collaboration/collaboration.entity';
import { DatabaseFactory } from '@notenic/database/database.factory';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@notenic/user/user.entity';
import { CreateCollaborationDto } from '@notenic/collaboration/dto/create-collaboration.dto';
import { plainToClass } from 'class-transformer';
import { IUserService } from '@notenic/user/user.service.interface';
import { UpdateCollaboratorsDto } from '@notenic/collaboration/dto/update-collaborators.dto';

@Injectable()
export class CollaborationService extends AbstractService<Collaboration> implements ICollaborationService {
  constructor(@InjectRepository(Collaboration, DatabaseFactory.connectionName) collaborationRepository: Repository<Collaboration>,
              @Inject('IUserService') private usersService: IUserService) {
    super(collaborationRepository);
  }

  async createCollaboration(user: User, createCollaborationDto: CreateCollaborationDto): Promise<Collaboration> {
    const collaboration = plainToClass(Collaboration, createCollaborationDto);
    const users = await this.usersService.getUsersByIds([user.id, ...createCollaborationDto.collaborators]);

    collaboration.user = users[0];
    collaboration.collaborators = users;

    await this.repository.save(collaboration);

    delete collaboration.user;
    delete collaboration.collaborators;

    return collaboration;
  }

  async getCollaboration(id: string, user: User): Promise<Collaboration> {
    const collaboration = await this.repository.createQueryBuilder('c')
      .select(['c', 'u.id', 'u.username', 'u.gender', 'u.image', 'user.id', 'user.username', 'user.image', 'user.gender'])
      .leftJoin('c.collaborators', 'u')
      .innerJoin('c.user', 'user')
      .where('c.id = :id', { id })
      .getOne()
    ;

    if (!collaboration.collaborators.find(u => u.id === user.id)) {
      throw new ForbiddenException();
    }

    return collaboration;
  }

  async updateCollaborators(user: User, updateCollaboratorsDto: UpdateCollaboratorsDto): Promise<User[]> {
    const collaboration = await this.repository.createQueryBuilder('c')
      .leftJoinAndSelect('c.collaborators', 'u')
      .innerJoinAndSelect('c.user', 'user')
      .where('c.id = :id', { id: updateCollaboratorsDto.collaborationId })
      .getOne()
    ;

    if (collaboration.user.id !== user.id) {
      throw new ForbiddenException();
    }

    collaboration.collaborators = await this.usersService.getUsersByIds([user.id, ...updateCollaboratorsDto.collaborators]);

    await this.repository.save(collaboration);

    return collaboration.collaborators.map(c => {
      const u = new User();
      u.id = c.id;
      u.image = c.image;
      u.gender = c.gender;
      u.username = c.username;
      return u;
    });
  }

  async getCollaborationsForUser(user: User): Promise<Collaboration[]> {
    return await this.repository.createQueryBuilder('c')
      .select(['c', 'user.id', 'user.username', 'user.gender', 'user.image'])
      .innerJoin('c.collaborators', 'u', 'u.id = :id', { id: user.id })
      .innerJoin('c.user', 'user')
      .getMany()
    ;
  }
}
