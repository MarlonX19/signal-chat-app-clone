import React from 'react';
import { AppScreens, AuthScreens } from './screens';

import { useAuth } from './hooks';

const Routes = () => {
  const { logged } = useAuth();
  return logged ? <AppScreens /> : <AuthScreens />
}

export default Routes;
