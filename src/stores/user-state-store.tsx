import { auth } from "@/firebase/intialize-firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import { create } from "zustand";

interface useUserStateStoreModal {
  user: User | null;
  isLoggedIn: boolean;
}

export const useUserStateStore = create<useUserStateStoreModal>(() => ({
  user: null,
  isLoggedIn: false,
}));

const _auth = auth;

onAuthStateChanged(_auth, (user) => {
  if (user) {
    useUserStateStore.setState({ isLoggedIn: true, user: user });
  } else {
    useUserStateStore.setState({ isLoggedIn: false, user: null });
  }
});
