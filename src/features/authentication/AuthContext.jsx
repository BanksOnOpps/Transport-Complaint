import { createContext, useContext, useEffect, useState } from "react";

import supabase from "../../services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user;

      if (currentUser) {
        setUser(currentUser);

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        setRole(profile?.role);
      }

      setLoading(false);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadSession(); // Refresh session when it changes
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, setUser, setRole, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
