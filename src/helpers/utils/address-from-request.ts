import { Request } from 'express';
import { NetworkAddress } from '../../api/types';

export default async function addressFromRequest(
  req: Request,
): Promise<NetworkAddress> {
  if (req.socket && req.socket.remoteAddress) {
    return {
      ip: req.socket.remoteAddress,
      port: String(req.socket.remotePort),
    };
  }

  if (req.socket && req.socket.remoteAddress) {
    return {
      ip: req.socket.remoteAddress,
      port: String(req.socket.remotePort),
    };
  }

  // All done.
  return {
    ip: '0.0.0.0',
    port: 'n/a',
  };
}
