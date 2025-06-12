import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxbcGo0aI4E79UpP8vurCk4IZ-aNfjYWQ",
  authDomain: "customshoese.firebaseapp.com",
  projectId: "customshoese",
  storageBucket: "customshoese.firebasestorage.app",
  messagingSenderId: "104058127966",
  appId: "1:104058127966:web:ea48727b3772b957f656cf",
  measurementId: "G-M8X2QTZGR5",
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
