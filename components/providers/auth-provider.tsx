"use client";

import { createClient } from "@/lib/supabase/clients";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";

type User = {
  id: string;
  email?: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<{
    user: SupabaseUser | null;
    session: Session | null;
  }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{
    user: SupabaseUser | null;
    session: Session | null;
  }>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateUserRole: (userId: string, role: string) => Promise<void>;
  getUsers: () => Promise<Array<{ id: string; email: string; role: string }>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          role: session.user.user_metadata?.role,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const updateUserRole = async (
    userId: string,
    role: string
  ): Promise<void> => {
    const { error } = await supabase
      .from("profiles")
      .update({ role })
      .eq("id", userId);

    if (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, email, role")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error.message);
      throw error;
    }

    console.log("Sign in successful:", data.user?.email);
    return data;
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Sign up error:", error.message);
      throw error;
    }

    console.log("Sign up successful:", data.user?.email);
    console.log("Confirmation email sent to:", data.user?.email);
    return data;
  };

  const signOut = async () => {
    try {
      console.log("Starting sign out process...");
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Sign out error:", error.message);
        throw error;
      }

      console.log("Sign out successful, clearing user state...");
      setUser(null);

      // Force a hard navigation to login page
      window.location.href = "/login";
    } catch (err) {
      console.error("Error during sign out:", err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        loading,
        updateUserRole,
        getUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
