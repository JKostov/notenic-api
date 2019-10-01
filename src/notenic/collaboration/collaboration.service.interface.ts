import { IService } from '@app/shared/types/abstract.service.interface';
import { Collaboration } from '@notenic/collaboration/collaboration.entity';
import { User } from '@notenic/user/user.entity';
import { CreateCollaborationDto } from '@notenic/collaboration/dto/create-collaboration.dto';
import { UpdateCollaboratorsDto } from '@notenic/collaboration/dto/update-collaborators.dto';
import { SaveCollaborationStateDto } from '@notenic/collaboration/dto/save-collaboration-state.dto';

export interface ICollaborationService extends IService<Collaboration> {
  createCollaboration(user: User, createCollaborationDto: CreateCollaborationDto): Promise<Collaboration>;

  getCollaboration(id: string, user: User): Promise<Collaboration>;

  updateCollaborators(user: User, updateCollaboratorsDto: UpdateCollaboratorsDto): Promise<User[]>;

  getCollaborationsForUser(user: User): Promise<Collaboration[]>;

  saveCollaborationState(user: User, saveCollaborationStateDto: SaveCollaborationStateDto): Promise<boolean>;

  publishCollaboration(user: User, saveCollaborationStateDto: SaveCollaborationStateDto): Promise<any>;
}
