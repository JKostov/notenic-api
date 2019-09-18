import { Body, Controller, Get, HttpStatus, Inject, Post, Req, Res, UseGuards } from '@nestjs/common';
import { INoteService } from '@notenic/note/note.service.interface';
import { CreateNoteDto } from '@notenic/note/dto/create-note.dto';
import { LoggedGuard } from '@notenic/guards/logged.guard';

@Controller('notes')
export class NoteController {
  constructor(@Inject('INoteService') private readonly noteService: INoteService) { }

  @Get('')
  public async getNotes(@Req() req, @Res() res) {
    const notes = await this.noteService.getNotes();

    return res.status(HttpStatus.OK).json(notes);
  }

  @Post('')
  @UseGuards(LoggedGuard)
  public async publishNote(@Body() createNoteDto: CreateNoteDto, @Req() req, @Res() res) {
    const user = req.user;

    await this.noteService.createNote(createNoteDto, user);

    return res.status(HttpStatus.OK).json({ success: true });
  }
}
