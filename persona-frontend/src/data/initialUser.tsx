import { AuthContextType } from "../types/AuthTypes";

export const initialAuthContextValue: AuthContextType = {
  user: null,
  setUser: () => {},
  loading: true,
};
