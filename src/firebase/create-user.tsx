import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./intialize-firebase";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { AUTH_FIREBASE_CODE_TO_USER_MESSAGE } from "./error-codes/auth-error-codes";

export const CreateUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredentials.user, {
      displayName: username,
    });
  } catch (err) {
    const e = err as FirebaseError;
    toast("Failed to Register User", {
      description:
        AUTH_FIREBASE_CODE_TO_USER_MESSAGE[
          e.code as keyof typeof AUTH_FIREBASE_CODE_TO_USER_MESSAGE
        ] || "An error occurred",
    });
    throw err;
  }
};
