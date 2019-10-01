import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoggedGuard } from '@app/shared/guards/logged.guard';
import { User } from '@notenic/user/user.entity';
import { ICollaborationService } from '@notenic/collaboration/collaboration.service.interface';
import { CreateCollaborationDto } from '@notenic/collaboration/dto/create-collaboration.dto';
import { UpdateCollaboratorsDto } from '@notenic/collaboration/dto/update-collaborators.dto';
import { SaveCollaborationStateDto } from '@notenic/collaboration/dto/save-collaboration-state.dto';

@Controller('collaborations')
export class CollaborationController {
  constructor(@Inject('ICollaborationService') private readonly collaborationService: ICollaborationService) { }

  @Get('')
  @UseGuards(LoggedGuard)
  public async getCollaborationsForUser(@Req() req, @Res() res) {
    const user: User = req.user;

    const collaborations = await this.collaborationService.getCollaborationsForUser(user);

    return res.status(HttpStatus.OK).json(collaborations);
  }

  @Get(':id')
  @UseGuards(LoggedGuard)
  public async getCollaboration(@Param() param, @Req() req, @Res() res) {
    const user: User = req.user;
    const id = param.id;

    const collaboration = await this.collaborationService.getCollaboration(id, user);

    return res.status(HttpStatus.OK).json(collaboration);
  }

  @Post('')
  @UseGuards(LoggedGuard)
  public async createCollaboration(@Req() req, @Res() res, @Body() createCollaborationDto: CreateCollaborationDto) {
    const user: User = req.user;

    const collaboration = await this.collaborationService.createCollaboration(user, createCollaborationDto);

    return res.status(HttpStatus.OK).json(collaboration);
  }

  @Post('update/collaborators')
  @UseGuards(LoggedGuard)
  public async updateCollaborators(@Req() req, @Res() res, @Body() updateCollaboratorsDto: UpdateCollaboratorsDto) {
    const user: User = req.user;

    const collaborators = await this.collaborationService.updateCollaborators(user, updateCollaboratorsDto);

    return res.status(HttpStatus.OK).json(collaborators);
  }

  @Post('save-state')
  @UseGuards(LoggedGuard)
  public async saveCollaborationState(@Req() req, @Res() res, @Body() saveCollaborationStateDto: SaveCollaborationStateDto) {
    const user: User = req.user;

    const result = await this.collaborationService.saveCollaborationState(user, saveCollaborationStateDto);

    return res.status(HttpStatus.OK).json(result);
  }

  @Post('publish')
  @UseGuards(LoggedGuard)
  public async publishCollaboration(@Req() req, @Res() res, @Body() saveCollaborationStateDto: SaveCollaborationStateDto) {
    const user: User = req.user;

    const result = await this.collaborationService.publishCollaboration(user, saveCollaborationStateDto);

    return res.status(HttpStatus.OK).json(result);
  }
}
