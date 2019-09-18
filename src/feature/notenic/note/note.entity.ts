import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from '@notenic/user/user.entity';

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

  @ManyToOne(type => User, user => user.notes)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
