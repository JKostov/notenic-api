import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from '@notenic/user/user.entity';
import { Note } from '@notenic/note/note.entity';

@Exclude()
@Entity({
  name: 'comments',
})
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column()
  markdown: string;

  @ManyToOne(type => Note, note => note.comments, { nullable: false })
  note: Note;

  @ManyToOne(type => User)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
