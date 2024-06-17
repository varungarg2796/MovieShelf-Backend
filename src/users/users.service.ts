import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
  
    const user = new User();
    user.username = username;
    user.email = email;
    user.password_salt = salt;
    user.password_hash = hashedPassword;

    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.error(error); // log the error
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Email/Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && await compare(password, user.password_hash)) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async generateUniqueUsername(firstName: string, lastName: string): Promise<string> {
    const baseUsername = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`.replace(/[^a-z0-9]/g, '');
    let username = baseUsername;
    let counter = 1;

    while (await this.userRepository.findOne({ where: { username } })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    return username;
  }
  async createGoogleUser(username: string, email: string, googleId: string): Promise<User> {
    const user = new User();
    user.username = username;
    user.email = email;
    user.googleid = googleId;
    try {
      await this.userRepository.save(user);
    } catch (error) {
      console.error(error); // log the error
      if (error.code === '23505') { // duplicate username
      throw new ConflictException('Email/Username already exists');
      } else {
      throw new InternalServerErrorException();
      }
    }
    return user;
    }



}
