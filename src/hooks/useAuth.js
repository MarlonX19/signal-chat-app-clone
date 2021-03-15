import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../contexts/authContext';


function useAuth() {
  const { logged } = useContext(AuthContext);

  return { logged }
}

export default useAuth;
