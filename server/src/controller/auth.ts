import User from '../models/User';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const createToken = (_id: any, username: string) => {
  const secret =
    process.env.SECRET_KEY || crypto.randomBytes(32).toString('hex');
  return jwt.sign({ _id, username }, secret, { expiresIn: '7h' });
};

export const signUpUser = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const user = await User.signup(username, password);
    const token = createToken(user._id, username);
    res.status(201).json({ message: 'Usuario creado', username, token });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);
    const token = createToken(user._id, user.username);
    res.status(200).json({ username, token });
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
