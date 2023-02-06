import { useContext, createContext, useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});


  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider);
    signInWithRedirect(auth, provider)
  };
  
  const logOut = () => {
      signOut(auth);

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser!==null){
		currentUser["firstName"] = (currentUser?.displayName)?.split(' ')[0];
		currentUser["lastName"] = (currentUser?.displayName)?.split(' ')[1];
		currentUser["lastLoginDate"] = new Date(parseInt(currentUser?.metadata?.lastLoginAt)).toLocaleDateString();
		console.log(typeof currentUser?.metadata?.lastLoginAt);
		console.log( new Date(parseInt(currentUser?.metadata?.lastLoginAt)).toLocaleDateString());
		
		
	  }
	  setUser(currentUser);
      console.log('User', currentUser)
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};