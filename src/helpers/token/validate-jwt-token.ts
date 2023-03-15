/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * Validates a token
 *
 * @param  {String}   token the token to be validated
 * @param  {Function} cb    called when error has occured or token is validated
 */
import jwt from 'jsonwebtoken';
import { Helpers } from '..';
import { UnauthorizedError } from '../../core';
import { UserModel } from '../../api/models';
import jwtConfig from 'src/config/jwt.interface';

export default async function validateJwtToken(
  token: string,
): Promise<UserModel> {
  // decode the token
  // @ts-ignore
  const _token = jwt.decode(token, jwtConfig.secret);

  if (!_token) throw new UnauthorizedError();

  // set the time of the request
  const _reqTime = Date.now();

  // If token is expired
  // @ts-ignore
  if (_token.exp <= _reqTime) {
    throw new UnauthorizedError();
  }

  // If token is early
  // @ts-ignore
  if (_reqTime <= _token.nbf) {
    throw new UnauthorizedError();
  }

  // If audience doesn't match
  if (jwtConfig.audience !== _token.aud) {
    throw new UnauthorizedError();
  }

  // Find the user the give token is issued to
  const user = await Helpers.token.findUserFromToken(_token);
  return user;
}
