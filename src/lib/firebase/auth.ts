import {
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./config";

// Re-export useAuth from the shared context (single source of truth)
export { useAuth } from "./AuthContext";

// Register service — creates both the Firebase Auth account and the Firestore user doc
export const registerUser = async (email: string, pass: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    // Create user profile in Firestore with role=admin
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role: "admin",
      createdAt: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Admin role verification (also used outside the hook, e.g. direct checks)
export const isAdmin = async (user: User | null): Promise<boolean> => {
  if (!user) return false;
  try {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    return userDoc.exists() && userDoc.data().role === "admin";
  } catch (error) {
    console.error("Error checking admin role:", error);
    return false;
  }
};

// Util: ensure a Firebase Auth user has a matching Firestore admin doc.
// Uses merge:true so it works whether the doc is missing OR has the wrong role.
export const ensureAdminDoc = async (user: User): Promise<boolean> => {
  try {
    const ref = doc(db, "users", user.uid);
    // Always upsert — creates or updates the doc with role=admin
    await setDoc(
      ref,
      {
        name: user.displayName || user.email,
        email: user.email,
        role: "admin",
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("ensureAdminDoc error:", error);
    return false;
  }
};

// Logout service
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
