import { createContext } from 'react';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);