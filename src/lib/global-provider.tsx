import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { supabase } from "./supabase";

interface AuthUser {
  id: string | null;
  email: string | null;
  [key: string]: any;
}

interface GlobalContextType {
  isLogged: boolean;
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {

  const [user, setUser] = useState<AuthUser | null>(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }: { data: { session: any } }) => {
      setUser(data?.session?.user ? { ...data.session.user, email: data.session.user.email ?? null } : null);
      setLoading(false);
    });

    const { data: listener }: { data: { subscription: { unsubscribe: () => void } } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ? { ...session.user, email: session.user.email ?? null } : null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    setUser(data.user ? { ...data.user, email: data.user.email ?? null } : null);
    setLoading(false);
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { error, data } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    setUser(data.user ? { ...data.user, email: data.user.email ?? null } : null);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  return (
    <GlobalContext.Provider value={{ isLogged: !!user, user, loading, login, logout, signUp }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("useGlobalContext must be used within a GlobalProvider");
  return context;
};

export default GlobalProvider;