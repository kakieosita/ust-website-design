import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdminUser: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdminUser: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          // Accept admin role OR if no Firestore doc yet treat email-verified users as admin
          const isAdmin = userDoc.exists() && userDoc.data().role === "admin";
          setIsAdminUser(isAdmin);
        } catch (err) {
          console.error("Admin check failed:", err);
          setIsAdminUser(false);
        }
      } else {
        setIsAdminUser(false);
      }

      // Only stop loading AFTER the Firestore check is done
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, isAdminUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Replaces the old useAuth hook — all components now share one auth state
export const useAuth = () => useContext(AuthContext);
