/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Creates a new JWT token
 */
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import uuid from 'node-uuid';
import { UserModel } from '../../api/models';
import jwtConfig from 'src/config/jwt.interface';

interface TokenData {
  token: string;
  expires: string;
}

export default async function createToken(
  req: Request,
  user: UserModel,
  rememberMe = false,
): Promise<TokenData> {
  const expiryUnit = (jwtConfig.expiry && jwtConfig.expiry.unit) || 'days';
  const expiryLength = rememberMe
    ? (jwtConfig.expiry && jwtConfig.expiry.rememberMeMaxLength) || 30
    : (jwtConfig.expiry && jwtConfig.expiry.length) || 7;
  // @ts-ignore
  const expires = moment().add(expiryLength, expiryUnit).valueOf();
  const issued = Date.now();

  const token = jwt.sign(
    {
      iss: user.id + '|' + req.socket.remoteAddress,
      sub: jwtConfig.subject,
      aud: jwtConfig.audience,
      exp: expires,
      nbf: issued,
      iat: issued,
      jti: uuid.v1(),
    },
    jwtConfig.secret,
  );

  return {
    token,
    // @ts-ignore
    expires,
  };
}
