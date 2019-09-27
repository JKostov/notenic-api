import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { User } from '@notenic/user/user.entity';

@Exclude()
@Entity({
  name: 'collaborations',
})
export class Collaboration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({
    length: 255,
  })
  title: string;

  @Expose()
  @Column({
    nullable: true,
  })
  markdown: string;

  @Expose()
  @Column({
    nullable: true,
  })
  image: string;

  @Expose()
  @Column()
  public: boolean;

  @Expose()
  @Column('text', { array: true, nullable: true })
  tags: string[];

  @ManyToOne(type => User, user => user.ownedCollaborations)
  user: User;

  @ManyToMany(type => User, user => user.collaborations)
  collaborators: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
