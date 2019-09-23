import { Controller, Get, HttpStatus, Inject, Param, Req, Res, UseGuards } from '@nestjs/common';
import { IUserService } from '@notenic/user/user.service.interface';
import { LoggedOrNotGuard } from '@notenic/guards/logged-or-not.guard';
import { User } from '@notenic/user/user.entity';

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
}
