import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as googleSignOut,
  User,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, authProvider } from '../firebaseService';

export function useAuth() {
  const [isAuthorized, setAuthorized] = useState(false);
  const [isLoadingAuth, setLoadingAuth] = useState(true);

  function setUserAuthorized(user: User | null) {
    if (user?.email === process.env.REACT_APP_ALLOWED_USER) {
      setAuthorized(true);
    }

    setLoadingAuth(false);
  }

  async function signIn() {
    try {
      const { user } = await signInWithPopup(auth, authProvider);
      setUserAuthorized(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    await googleSignOut(auth);
    setAuthorized(false);
  }

  useEffect(() => {
    onAuthStateChanged(auth, setUserAuthorized);
  }, []);

  return [isAuthorized, isLoadingAuth, signIn, signOut] as const;
}
