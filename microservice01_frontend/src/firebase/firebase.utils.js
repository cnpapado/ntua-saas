import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwWgkxp5CXlvZ1g-4b1MEB2uiBajx9ZgM",
  authDomain: "saas-56.firebaseapp.com",
  databaseURL: "https://saas-56-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "saas-56",
  storageBucket: "saas-56.appspot.com",
  messagingSenderId: "293334217491",
  appId: "1:293334217491:web:9f88a139de231d213e60e6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
	  //optionally log user data in the console for debugging purposes
	  console.log(name,email);
    })
    .catch((error) => {
      console.log(error);
    });
};