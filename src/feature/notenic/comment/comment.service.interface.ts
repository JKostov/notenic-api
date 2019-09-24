import { Note } from '@notenic/note/note.entity';
import { User } from '@notenic/user/user.entity';
import { Comment } from '@notenic/comment/comment.entity';

export interface ICommentService {
  createComment(comment: string, note: Note, user: User): Promise<Comment>;
}
