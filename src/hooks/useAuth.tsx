import { createContext, useContext, ReactNode } from "react";

interface User {
  role: "admin" | "supervisor" | "seller";
}

interface AuthContextType {
  user: User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Utilisateur par défaut avec le rôle admin
  const defaultUser: User = {
    role: "admin"
  };

  return (
    <AuthContext.Provider value={{ user: defaultUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}