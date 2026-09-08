import { createContext } from 'react';

export type UserProfile = {
  name: string;
  email: string;
  avatar: string;
};

export type UserContextValue = {
  user: UserProfile;
  setUserName: (name: string) => void;
  logout: () => void;
};

export const defaultUser: UserProfile = {
  name: 'Nguyễn Văn An',
  email: 'nguyenvanan@example.com',
  avatar: 'https://i.pravatar.cc/200?img=12',
};

export const UserContext = createContext<UserContextValue | undefined>(undefined);