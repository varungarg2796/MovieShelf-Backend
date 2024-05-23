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
    console.log(userProfile)
    return this.userProfileRepository.save(userProfile);
  }

  async getUserProfile(userId: number): Promise<UserProfile> {
    return this.userProfileRepository.findOne({ where: { user : { user_id: userId } } });
  }

  async updateUserProfile(userId: number, userProfile: Partial<UserProfile>): Promise<UserProfile> {
    const { ...rest } = userProfile;
    await this.userProfileRepository.update({ user: { user_id: userId } }, rest);
    return this.userProfileRepository.findOne({ where: { user : { user_id: userId } } });
  }
}