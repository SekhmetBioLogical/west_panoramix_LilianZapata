import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// configuracion de las variables de entorno para firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// log para depuracion de la api key en consola
console.log("api key que estoy leyendo:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);

// inicializacion de la aplicacion y del servicio de autenticacion
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);