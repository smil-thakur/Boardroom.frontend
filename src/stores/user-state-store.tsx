import { auth } from "@/firebase/intialize-firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { create } from "zustand";

interface useUserStateStoreModal {
  user: User | null;
  isLoggedIn: boolean;
  isAuthChecked: boolean;
}

export const useUserStateStore = create<useUserStateStoreModal>(() => ({
  user: null,
  isLoggedIn: false,
  isAuthChecked: false,
}));

const _auth = auth;

onAuthStateChanged(_auth, (user) => {
  if (user) {
    useUserStateStore.setState({ 
      isLoggedIn: user.emailVerified, 
      user: user,
      isAuthChecked: true 
    });
  } else {
    useUserStateStore.setState({ 
      isLoggedIn: false, 
      user: null,
      isAuthChecked: true 
    });
  }
});
