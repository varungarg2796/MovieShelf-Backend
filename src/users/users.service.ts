import { Injectable } from '@nestjs/common';
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

    try{
      await this.userRepository.save(user);
    } catch (error) {
      console.error(error);
      throw new Error('Unable to add user');
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
}
