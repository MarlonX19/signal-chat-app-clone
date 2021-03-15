import React, { useState, createContext } from 'react';

import { auth } from '../../firebase';

export const AuthContext = createContext({});

const AuthenticationContext = ({ children }) => {
  const [logged, setLogged] = useState(false);

  async function handleSignIn(email, password) {
      auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        setLogged(true);
      })
      .catch(error => {
        setLogged(false);
        alert(error.message);
      })
  }

  return (
    <AuthContext.Provider value={{ logged, handleSignIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthenticationContext;
