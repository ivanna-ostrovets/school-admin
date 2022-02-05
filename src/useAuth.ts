import firebase, { User } from 'firebase/app';
import { useEffect, useState } from 'react';

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
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const { user } = await firebase.auth().signInWithPopup(provider);
      setUserAuthorized(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    await firebase.auth().signOut();
    setAuthorized(false);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUserAuthorized);
  }, []);

  return [isAuthorized, isLoadingAuth, signIn, signOut] as const;
}
