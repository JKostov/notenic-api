import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { PasswordReset } from '@notenic/auth/password-reset.entity';
import { Note } from '@notenic/note/note.entity';
import { Collaboration } from '@notenic/collaboration/collaboration.entity';

@Exclude()
@Entity({
  name: 'users',
})
export class User {
  public static GenderMale = 'male';
  public static GenderFemale = 'female';

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({
    length: 255,
  })
  firstName: string;

  @Expose()
  @Column({
    length: 255,
  })
  lastName: string;

  @Expose()
  @Column({
    unique: true,
    length: 255,
  })
  username: string;

  @Expose()
  @Column({
    unique: true,
    length: 255,
  })
  email: string;

  @Expose()
  @Column()
  password: string;

  @Expose()
  @Column({
    default: false,
  })
  enabled: boolean;

  @Expose()
  @Column({
    length: 255,
    nullable: true,
  })
  work: string;

  @Expose()
  @Column({
    length: 255,
    nullable: true,
  })
  education: string;

  @Expose()
  @Column({
    length: 500,
    nullable: true,
  })
  about: string;

  @Expose()
  @Column({
    length: 15,
    default: this.GenderMale,
  })
  gender: string;

  @Expose()
  @Column({
    nullable: true,
  })
  image: string;

  @Expose()
  @Column({
    nullable: true,
  })
  registrationToken: string;

  @OneToMany(type => PasswordReset, passwordReset => passwordReset.user)
  passwordResets: PasswordReset[];

  @OneToMany(type => Note, note => note.user)
  notes: Note[];

  @OneToMany(type => Collaboration, collaboration => collaboration.user)
  ownedCollaborations: Collaboration[];

  @ManyToMany(type => Collaboration, collaboration => collaboration.collaborators)
  @JoinTable({
    name: 'users_collaborations',
  })
  collaborations: Collaboration[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToMany(type => User, user => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(type => User, user => user.following)
  followers: User[];

  @ManyToMany(type => Note, note => note.usersBookmarkedNote)
  @JoinTable({
    name: 'users_bookmarked_notes',
  })
  bookmarkedNotes: Note[];
}
