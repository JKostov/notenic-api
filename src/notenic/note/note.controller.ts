import { Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { INoteService } from '@notenic/note/note.service.interface';
import { CreateNoteDto } from '@notenic/note/dto/create-note.dto';
import { AddCommentDto } from '@notenic/comment/dto/add.comment.dto';
import { ICommentService } from '@notenic/comment/comment.service.interface';
import { LikeNoteDto } from '@notenic/note/dto/like-note.dto';
import { IUserService } from '@notenic/user/user.service.interface';
import { LoggedGuard } from '@app/shared/guards/logged.guard';
import { ClientProxy } from '@nestjs/microservices';
import { BookmarkNoteDto } from '@notenic/note/dto/bookmark-note.dto';

@Controller('notes')
export class NoteController {
  constructor(@Inject('INoteService') private readonly noteService: INoteService,
              @Inject('ICommentService') private readonly commentService: ICommentService,
              @Inject('IUserService') private readonly userService: IUserService,
              @Inject('SERVICES_CLIENT') private readonly client: ClientProxy) {
  }

  @Get('')
  public async getNotes(@Req() req, @Res() res) {
    const notes = await this.noteService.getNotes();

    return res.status(HttpStatus.OK).json(notes);
  }

  @Get(':id/collaborators/data')
  public async getCollaborators(@Param() param, @Res() res) {
    const id = param.id;
    const users = await this.noteService.getCollaborators(id);

    return res.status(HttpStatus.OK).json(users);
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

    const followers = await this.userService.getFollowersForUser(user);
    const note = await this.noteService.createNote(createNoteDto, user);

    if (followers.length > 0 && note && note.public) {
      this.client.emit('published_note', {
        recipients: followers,
        userId: user.id,
        note: { username: user.username, title: note.title },
      });
    }

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

    if (comment && note) {
      this.client.emit('commented_note', {
        recipient: note.user.id,
        userId: user.id,
        note: { username: note.user.username, title: note.title },
      });
    }

    return res.status(HttpStatus.OK).json(comment);
  }

  @Post('like')
  @UseGuards(LoggedGuard)
  public async likeNote(@Body() likeNoteDto: LikeNoteDto, @Req() req, @Res() res) {
    const user = req.user;

    const likedNote = await this.noteService.likeNote(likeNoteDto, user);

    let result = false;
    if (likedNote && likeNoteDto.like) {
      this.client.emit('liked_note', {
        recipient: likedNote.user.id,
        userId: user.id,
        note: { username: likedNote.user.username, title: likedNote.title },
      });
      result = true;
    }

    return res.status(HttpStatus.OK).json({ success: result });
  }

  @Post('bookmark')
  @UseGuards(LoggedGuard)
  public async bookmarkNote(@Body() bookmarkNoteDto: BookmarkNoteDto, @Req() req, @Res() res) {
    const user = req.user;

    const result = await this.noteService.bookmarkNote(bookmarkNoteDto, user);

    return res.status(HttpStatus.OK).json(result);
  }

  @Get('bookmarked')
  @UseGuards(LoggedGuard)
  public async bookmarkedNotes(@Req() req, @Res() res) {
    const user = req.user;

    const result = await this.noteService.getBookmarkedNotes(user);

    return res.status(HttpStatus.OK).json(result);
  }
}
