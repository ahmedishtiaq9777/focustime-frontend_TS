import {
  useState,
  type ReactNode,
  useEffect,
  createContext,
  useContext,
} from "react";
import type { UserResponse } from "focustime_types";
import type { LoginResponse as LoginDTO } from "../api/authApi";

interface AuthContextProps {
  user: UserResponse | null;
  token: string | null;
  login: (data: LoginDTO) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("authToken")
  );

  const [user, setUser] = useState<UserResponse | null>(() => {
    const raw = localStorage.getItem("user");

    return raw ? JSON.parse(raw) : null;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // On mount we already set initial state from localStorage
    setLoading(false);
  }, []);

  const login = (data: LoginDTO) => {
    console.log("data", data);
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    console.log("login done");
  };
  const logout = () => {
    console.log("logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
