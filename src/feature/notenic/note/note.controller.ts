import { Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { INoteService } from '@notenic/note/note.service.interface';
import { CreateNoteDto } from '@notenic/note/dto/create-note.dto';
import { LoggedGuard } from '@notenic/guards/logged.guard';
import { AddCommentDto } from '@notenic/comment/dto/add.comment.dto';
import { ICommentService } from '@notenic/comment/comment.service.interface';
import { LikeNoteDto } from '@notenic/note/dto/like-note.dto';
import { IUserService } from '@notenic/user/user.service.interface';

@Controller('notes')
export class NoteController {
  constructor(@Inject('INoteService') private readonly noteService: INoteService,
              @Inject('ICommentService') private readonly commentService: ICommentService,
              @Inject('IUserService') private readonly userService: IUserService) { }

  @Get('')
  public async getNotes(@Req() req, @Res() res) {
    const notes = await this.noteService.getNotes();

    return res.status(HttpStatus.OK).json(notes);
  }

  @Get(':username/:noteTitle')
  public async getNote(@Param() param, @Res() res) {
    const username = param.username;
    const noteTitle = param.noteTitle;

    const note = await this.noteService.getPublicNote(username, noteTitle);
    if (!note) {
      throw new NotFoundException('Note not found.');
    }

    return res.status(HttpStatus.OK).json(note);
  }

  @Post('')
  @UseGuards(LoggedGuard)
  public async publishNote(@Body() createNoteDto: CreateNoteDto, @Req() req, @Res() res) {
    const user = req.user;

    await this.noteService.createNote(createNoteDto, user);

    return res.status(HttpStatus.OK).json({ success: true });
  }

  @Post(':noteId/comments')
  @UseGuards(LoggedGuard)
  public async addComment(@Body() addCommentDto: AddCommentDto, @Param() param, @Req() req, @Res() res) {
    const user = req.user;
    const noteId = param.noteId;

    const note = await this.noteService.getPublicNoteById(noteId);
    const u = await this.userService.getByIdPublic(user.id);

    const comment = await this.commentService.createComment(addCommentDto.markdown, note, u);

    return res.status(HttpStatus.OK).json(comment);
  }

  @Post('like')
  @UseGuards(LoggedGuard)
  public async likeNote(@Body() likeNoteDto: LikeNoteDto, @Req() req, @Res() res) {
    const user = req.user;

    const result = await this.noteService.likeNote(likeNoteDto, user);

    return res.status(HttpStatus.OK).json({ success: result });
  }
}
