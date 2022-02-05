import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthorized, isLoadingAuth, signIn } = useContext(AppContext);

  if (isLoadingAuth) return <CircularProgress />;

  if (!isLoadingAuth && !isAuthorized) {
    return (
      <Button variant="outlined" color="primary" onClick={signIn}>
        Увійти за допомогою Google
      </Button>
    );
  }

  return <>{children}</>;
}
