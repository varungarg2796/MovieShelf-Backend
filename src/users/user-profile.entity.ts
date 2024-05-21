import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    OneToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from './user.entity';
  
  @Entity('User_Profile')
  @Unique('unique_user_profile', ['user'])
  export class UserProfile {
    @PrimaryGeneratedColumn()
    user_profile_id: number;
  
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ type: 'date', nullable: true })
    date_of_birth: Date;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    profile_picture: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    first_name: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    last_name: string;
  
    @Column({ type: 'text', nullable: true })
    bio: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    languages: string;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    country: string;
  }