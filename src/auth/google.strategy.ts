import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:  process.env.OAUTH2_CLIENT_ID,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const {name, emails, picture, id} = profile;
    const user = {
      emails,
      name,
      picture,
      accessToken,
      refreshToken,
      id
    }
    done(null, user);
    // You can use the `accessToken` to interact with the OAuth2 server, 
    // and `profile` (if exists) contains the user information.
    // You should find or create the user in your database and return the user object.
    // For example:
    // const user = await this.usersService.findOrCreate(profile);
    // done(null, user);
  }
}