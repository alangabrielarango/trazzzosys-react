import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, unique: true, required: true },
  password: String,
});

interface IUserModel extends Model<IUser> {
  signup(username: string, password: string): Promise<IUser>;
  login(username: string, password: string): Promise<IUser>;
}

UserSchema.statics.signup = async function (
  username,
  password
): Promise<IUser> {
  if (!username || !password) {
    throw Error('Ingrese usuario y contraseña');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Contraseña muy débil');
  }

  const exists = await this.findOne({ username });
  if (exists) {
    throw Error('Username already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, password: hash });

  return user;
};

UserSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error('Ingrese usuario y contraseña');
  }
  const user = await this.findOne({ username });
  if (!user) {
    throw Error('Datos incorrectos');
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Datos incorrectos');
  }
  return user;
};

const User = model<IUser, IUserModel>('User', UserSchema);

export default User;
