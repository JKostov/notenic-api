import { ForbiddenException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { SaveCollaborationStateDto } from '@notenic/collaboration/dto/save-collaboration-state.dto';
import { Note } from '@notenic/note/note.entity';
import { INoteService } from '@notenic/note/note.service.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CollaborationService extends AbstractService<Collaboration> implements ICollaborationService {
  constructor(@InjectRepository(Collaboration, DatabaseFactory.connectionName) collaborationRepository: Repository<Collaboration>,
              @Inject('IUserService') private usersService: IUserService, @Inject('INoteService') private noteService: INoteService,
              @Inject('SERVICES_CLIENT') private readonly client: ClientProxy) {
    super(collaborationRepository);
  }

  async createCollaboration(user: User, createCollaborationDto: CreateCollaborationDto): Promise<Collaboration> {
    const collaboration = plainToClass(Collaboration, createCollaborationDto);
    const users = await this.usersService.getUsersByIds([user.id, ...createCollaborationDto.collaborators]);

    collaboration.user = users.find(u => u.id === user.id);
    collaboration.collaborators = users;
    collaboration.public = true;

    await this.repository.save(collaboration);

    this.client.emit('created_collaboration', {
      recipients: collaboration.collaborators.filter(c => c.id !== collaboration.user.id).map(c => c.id),
      userId: user.id,
      note: null,
    });

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

    const newCollaborators = updateCollaboratorsDto.collaborators.filter(c => !collaboration.collaborators.find(cc => cc.id === c));

    collaboration.collaborators = await this.usersService.getUsersByIds([user.id, ...updateCollaboratorsDto.collaborators]);

    await this.repository.save(collaboration);

    this.client.emit('created_collaboration', {
      recipients: newCollaborators,
      userId: user.id,
      note: null,
    });

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

  async saveCollaborationState(user: User, saveCollaborationStateDto: SaveCollaborationStateDto): Promise<boolean> {
    const collaboration = await this.repository.createQueryBuilder('c')
      .leftJoinAndSelect('c.collaborators', 'u', 'u.id = :userId', { userId: user.id })
      .where('c.id = :id', { id: saveCollaborationStateDto.id })
      .getOne()
    ;

    if (!collaboration) {
      throw new NotFoundException();
    }

    await this.repository.createQueryBuilder()
      .update(Collaboration)
      .set({
        title: saveCollaborationStateDto.title,
        markdown: saveCollaborationStateDto.markdown,
        image: saveCollaborationStateDto.image,
        tags: saveCollaborationStateDto.tags,
        // public: saveCollaborationStateDto.public,
      })
      .where('id = :id', { id: collaboration.id })
      .execute()
    ;

    return true;
  }

  async publishCollaboration(user: User, saveCollaborationStateDto: SaveCollaborationStateDto): Promise<any> {
    const collaboration = await this.repository.createQueryBuilder('c')
      .leftJoinAndSelect('c.collaborators', 'u')
      .innerJoinAndSelect('c.user', 'user')
      .where('c.id = :id', { id: saveCollaborationStateDto.id })
      .getOne()
    ;

    if (!collaboration) {
      throw new NotFoundException();
    }

    const note = new Note();
    note.title = saveCollaborationStateDto.title;
    note.image = saveCollaborationStateDto.image;
    note.user = collaboration.user;
    note.tags = saveCollaborationStateDto.tags;
    note.markdown = saveCollaborationStateDto.markdown;
    note.public = true;
    note.collaborators = collaboration.collaborators.map(c => c.id);

    const followers = await this.usersService.getFollowersForUser(user);
    await this.noteService.create(note);

    if (followers.length > 0 && note && note.public) {
      this.client.emit('published_note', {
        recipients: followers,
        userId: user.id,
        note: { username: user.username, title: note.title },
      });
    }

    await this.repository.delete(collaboration.id);

    return;
  }
}
