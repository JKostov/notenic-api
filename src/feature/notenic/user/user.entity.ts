import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { PasswordReset } from '@notenic/auth/password-reset.entity';

@Exclude()
@Entity({
  name: 'users',
})
export class User {
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
    nullable: true,
  })
  registrationToken: string;

  @OneToMany(type => PasswordReset, passwordReset => passwordReset.user)
  passwordResets: PasswordReset[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
