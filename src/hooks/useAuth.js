import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../contexts/authContext';


function useAuth() {
  const { logged, handleSignIn, handleSignOut } = useContext(AuthContext);

  return { logged, handleSignIn, handleSignOut }
}

export default useAuth;
