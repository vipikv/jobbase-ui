"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getStoredAuth,
  loginUser,
  registerUser,
  forgotPasswordRequest,
  setStoredAuth,
  type AuthState,
  type User,
} from "@/lib/api";

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: string;
  }) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredAuth();
    setAuth(stored);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    const nextAuth = { token: response.token, user: response.user };
    setAuth(nextAuth);
    setStoredAuth(nextAuth);
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role?: string;
  }) => {
    await registerUser(payload);
  };

  const forgotPassword = async (email: string) => {
    await forgotPasswordRequest(email);
  };

  const logout = () => {
    setAuth(null);
    setStoredAuth(null);
  };

  const updateUser = (user: User) => {
    setAuth((current) => (current ? { ...current, user } : current));
    setStoredAuth(auth ? { ...auth, user } : null);
  };

  const value = useMemo(
    () => ({
      user: auth?.user ?? null,
      token: auth?.token ?? null,
      loading,
      login,
      register,
      forgotPassword,
      logout,
      updateUser,
    }),
    [auth, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
