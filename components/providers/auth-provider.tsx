"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Get initial session
    const getInitialSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !user) return;

    let cancelled = false;
    const checkUserRecord = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("id")
          .eq("id", user.id)
          .single();
        if (!cancelled && (error || !data)) {
          // User record missing, sign out
          await signOut();
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error checking user record:", error);
      }
    };
    checkUserRecord();
    return () => {
      cancelled = true;
    };
  }, [user, mounted]);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Don't render children until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <AuthContext.Provider
        value={{ user: null, session: null, loading: true, signOut }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
