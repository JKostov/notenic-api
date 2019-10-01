import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from '@notenic/user/user.entity';
import { Comment } from '@notenic/comment/comment.entity';

@Exclude()
@Entity({
  name: 'notes',
})
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({
    length: 255,
  })
  title: string;

  @Expose()
  @Column()
  markdown: string;

  @Expose()
  @Column()
  image: string;

  @Expose()
  @Column()
  public: boolean;

  @Expose()
  @Column('text', { array: true, nullable: true })
  tags: string[];

  @Column('text', { array: true, nullable: true })
  likes: string[];

  @Expose()
  @Column('text', { array: true, nullable: true })
  collaborators: string[];

  @ManyToOne(type => User, user => user.notes)
  user: User;

  @OneToMany(type => Comment, comment => comment.note)
  comments: Comment[];

  @ManyToMany(type => User, user => user.bookmarkedNotes)
  usersBookmarkedNote: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
