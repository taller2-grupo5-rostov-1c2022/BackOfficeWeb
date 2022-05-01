import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(), provider);
};

export const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(), email, password);
};

export const logOut = () => {
  return signOut(getAuth());
};
