import { Injectable, Req } from '@nestjs/common';
import { Request } from 'express';
import { UnauthorizedError } from '../../core';

@Injectable()
export class TokenService {
  async getTokenFromRequest(@Req() req: Request): Promise<string> {
    // Get access token.
    let accessToken;

    if (req.headers && req.headers.authorization) {
      const [scheme, credentials] = req.headers.authorization.split(' ');
      if (scheme && credentials) {
        if (/^Bearer$/i.test(scheme)) {
          accessToken = credentials;
        }
      }
    } else {
      const params = { ...req.params, ...req.headers, ...req.query };
      accessToken = params.access_token;
    }

    // Send back the result through the success exit.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return accessToken;
  }

  async validateTokenRequest(@Req() req: Request): Promise<boolean> {
    const token = await this.getTokenFromRequest(req);

    if (!token) throw new UnauthorizedError();

    // TODO: check if we're tracking usage
    /*
    if(sails.config.jsonWebTokens.trackUsage){
      var address = await sails.helpers.addressFromRequest(inputs.req);
      return await sails.helpers.trackTokenUsage(address, token, user, cb);
    }
    */

    return true;
  }
}
