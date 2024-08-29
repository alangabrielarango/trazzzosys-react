import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User';

export const requireAuth = (req: any, res: any, next: any) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token con formato invalido' });
  }
  const secret =
  process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');
  jwt.verify(token, secret, async (err: any, user: any) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalido' });
    }
    const userData = await User.findOne({ username: user.username });
    if (!userData) {
      throw Error('Token invalido');
    }
    req.user = user;
    next();
  });
};
