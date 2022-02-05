import React from 'react';
import { useAuth } from './utils/useAuth';

interface AppContextInterface {
  isAuthorized: boolean;
  isLoadingAuth: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AppContext = React.createContext<AppContextInterface>({
  isAuthorized: false,
  isLoadingAuth: false,
  signIn: async () => {},
  signOut: async () => {},
});

function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuthorized, isLoadingAuth, signIn, signOut] = useAuth();

  return (
    <AppContext.Provider
      value={{ isAuthorized, isLoadingAuth, signIn, signOut }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
