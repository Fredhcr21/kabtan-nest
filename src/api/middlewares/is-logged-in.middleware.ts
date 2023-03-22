import { Injectable, NestMiddleware } from '@nestjs/common';
import { validateFirebaseIDToken } from 'src/helpers/validate-firebase-idtoken';

@Injectable()
export class IsLoggedInMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    try {
      if (!req.headers.authorization) {
        throw new Error('Unauthorized, Authorization header not provided');
      }

      const [, token] = req.headers.authorization?.split(' ');
      if (!token) {
        throw new Error('Unauthorized token not provided');
      }

      const userUID = await validateFirebaseIDToken(token);

      if (!userUID) throw new Error('Unauthorized');

      // Add the User UID to the request object
      req.me = userUID;

      return next();
    } catch (error) {
      res.status(403).send('Unauthorized, Authorization header not provided');
    }
  }
}
