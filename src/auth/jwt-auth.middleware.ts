import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    try {
      const payload = await this.authService.verifyToken(token);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }
}