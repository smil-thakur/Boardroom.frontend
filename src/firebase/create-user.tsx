import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile, signOut } from "firebase/auth";
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
    
    // Update profile
    await updateProfile(userCredentials.user, {
      displayName: username,
    });

    // Send verification email
    await sendEmailVerification(userCredentials.user);
    
    // Sign out immediately so they have to login after verifying
    await signOut(auth);

    toast.success("Registration Successful", {
      description: "A verification email has been sent. Please check your inbox.",
    });

    return userCredentials.user;
  } catch (err) {
    const e = err as FirebaseError;
    toast.error("Failed to Register User", {
      description:
        AUTH_FIREBASE_CODE_TO_USER_MESSAGE[
          e.code as keyof typeof AUTH_FIREBASE_CODE_TO_USER_MESSAGE
        ] || "An error occurred",
    });
    throw err;
  }
};
