// auth.ts
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, UserCredential } from "firebase/auth";

// Function to sign in with Google
export const signInWithGoogle = async (): Promise<UserCredential | void> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User signed in:", result.user);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

