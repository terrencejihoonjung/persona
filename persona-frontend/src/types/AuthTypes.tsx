import { User } from "./UserTypes";

export type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
  loading: boolean;
};
