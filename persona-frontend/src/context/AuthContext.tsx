import { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/UserTypes";

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
};

const initialAuthContextValue: AuthContextType = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContextValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/users/verifyUser",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Verification failed");
        }

        const data = await response.json();
        setUser(data.user);
        console.log(data.user);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
