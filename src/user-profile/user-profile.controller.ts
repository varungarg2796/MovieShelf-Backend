import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './user-profile.entity';

@Controller('user-profile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Get(':id')
  getUserProfile(@Param('id') id: number) {
    return this.userProfileService.getUserProfile(id);
  }

  @Put(':id')
  updateUserProfile(@Param('id') id: number, @Body() userProfile: Partial<UserProfile>) {
    // delete the values of user_profile_id and user_id if they are present
    console.log(userProfile)
    if (userProfile.user_profile_id) {
        delete userProfile.user_profile_id;
      }
      if (userProfile.user?.user_id) {
        delete userProfile.user.user_id;
    }
    return this.userProfileService.updateUserProfile(id, userProfile);
  }
}