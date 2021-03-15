import React, { useState, createContext } from 'react';

import { auth } from '../../firebase';

export const AuthContext = createContext({});

const AuthenticationContext = ({ children }) => {
  const [logged, setLogged] = useState(false);

  function handleSignIn(email, password) {
      auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        setLogged(true);
      })
      .catch(error => {
        setLogged(false);
        alert(error.message);
      })
  }

  function handleSignOut(params) {
    auth.signOut().then(() => {
      setLogged(false)
    })
  }

  return (
    <AuthContext.Provider value={{ logged, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthenticationContext;
