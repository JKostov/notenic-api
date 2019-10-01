import { Body, Controller, Get, HttpStatus, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { IUserService } from '@notenic/user/user.service.interface';
import { User } from '@notenic/user/user.entity';
import { UpdateUserDto } from '@notenic/user/dto/update-user.dto';
import { LoggedGuard } from '@app/shared/guards/logged.guard';
import { LoggedOrNotGuard } from '@app/shared/guards/logged-or-not.guard';
import { FollowUserDto } from '@notenic/user/dto/follow-user.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Controller('users')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService, @Inject('SERVICES_CLIENT') private readonly client: ClientProxy) { }

  @Get('user/following')
  @UseGuards(LoggedGuard)
  public async getFollowingUsers(@Req() req, @Res() res) {
    const user: User = req.user;

    const users = await this.userService.getFollowingUsersForUser(user);

    return res.status(HttpStatus.OK).json(users);
  }

  @Get(':username')
  @UseGuards(LoggedOrNotGuard)
  public async getNotes(@Param() param, @Req() req, @Res() res) {
    const loggedUser: User = req.user;
    const username = param.username;
    let loadPrivateNotes = false;

    if (loggedUser && loggedUser.username === username) {
      loadPrivateNotes = true;
    }

    const user = await this.userService.getUserInfoWithNotes(username, loadPrivateNotes);

    return res.status(HttpStatus.OK).json(user);
  }

  @Get(':id/image-data')
  public async getUserImageData(@Param() param, @Req() req, @Res() res) {
    const id = param.id;

    const user = await this.userService.getUserImageData(id);

    return res.status(HttpStatus.OK).json(user);
  }

  @Post('')
  @UseGuards(LoggedGuard)
  public async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req, @Res() res) {
    const loggedUser: User = req.user;

    const user = await this.userService.updateUser(loggedUser, updateUserDto);

    return res.status(HttpStatus.OK).json(user);
  }

  @Post('follow')
  @UseGuards(LoggedGuard)
  public async followUser(@Body() followUserDto: FollowUserDto, @Req() req, @Res() res) {
    const loggedUser: User = req.user;

    const result: { user: User, follow: boolean } = await this.userService.followUser(loggedUser, followUserDto);

    if (result && result.follow) {
      this.client.emit('user_followed', {
        recipient: followUserDto.userId,
        userId: loggedUser.id,
        note: null,
      });
    }

    return res.status(HttpStatus.OK).json(result.user);
  }

  @MessagePattern({ cmd: 'checkUserCollaboration' })
  async checkUserCollaboration(data: { user: User, collaborationId: string }): Promise<boolean> {
    return await this.userService.checkUserCollaboration(data.user, data.collaborationId);
  }
}
