import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private userProfileRepository: Repository<UserProfile>,
  ) {}

  async createUserProfile(userId: number, firstName: string, lastName: string): Promise<UserProfile> {
    const userProfile = new UserProfile();
    userProfile.user = { user_id: userId } as any;
    userProfile.first_name = firstName;
    userProfile.last_name = lastName;
    return this.userProfileRepository.save(userProfile);
  }
}