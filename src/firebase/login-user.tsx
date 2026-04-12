import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./intialize-firebase";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { AUTH_FIREBASE_CODE_TO_USER_MESSAGE } from "./error-codes/auth-error-codes";

export const LoginUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    const e = err as FirebaseError;
    toast("Failed to Login User", {
      description:
        AUTH_FIREBASE_CODE_TO_USER_MESSAGE[
          e.code as keyof typeof AUTH_FIREBASE_CODE_TO_USER_MESSAGE
        ] || "An error occurred",
    });
    throw err;
  }
};

export const LoginUserViaGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    const e = err as FirebaseError;
    toast("Failed to Login User", {
      description:
        AUTH_FIREBASE_CODE_TO_USER_MESSAGE[
          e.code as keyof typeof AUTH_FIREBASE_CODE_TO_USER_MESSAGE
        ] || "An error occurred",
    });
    throw err;
  }
};
