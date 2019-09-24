import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { IUserService } from '@notenic/user/user.service.interface';
import { LoggedOrNotGuard } from '@notenic/guards/logged-or-not.guard';
import { User } from '@notenic/user/user.entity';
import { LoggedGuard } from '@notenic/guards/logged.guard';
import { UpdateUserDto } from '@notenic/user/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(@Inject('IUserService') private readonly userService: IUserService) { }

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

  @Post('')
  @UseGuards(LoggedGuard)
  public async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req, @Res() res) {
    const loggedUser: User = req.user;

    const user = await this.userService.updateUser(loggedUser, updateUserDto);

    return res.status(HttpStatus.OK).json(user);
  }
}
