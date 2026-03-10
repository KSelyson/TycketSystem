import { Schema, model, Document } from 'mongoose';

//interface para criar o esquema do usuário e importar
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

//esquema no moongoose para criar o modelo do usuário
const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now }
});

export const User = model<IUser>('User', UserSchema);