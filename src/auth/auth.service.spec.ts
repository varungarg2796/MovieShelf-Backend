import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { UserProfileService } from '../users/user-profile.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockJwtService = { sign: () => 'mockJwt' };
  let mockUsersService = { find: () => Promise.resolve([]) };
  let mockUserRepository = { findOne: () => Promise.resolve(new User()) };
  let mockUserProfileService = {createUserProfile: () => Promise.resolve({})};
  let mockDataSource = { /* mock methods as needed */ };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, 
        { provide: UsersService, useValue: mockUsersService }, 
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserProfileService, useValue: mockUserProfileService },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});