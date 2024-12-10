// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlWuopRyC2lXdTStXVN7t0nr-eDRed4wc",
  authDomain: "tourism-5775d.firebaseapp.com",
  projectId: "tourism-5775d",
  storageBucket: "tourism-5775d.firebasestorage.app",
  messagingSenderId: "113372225923",
  appId: "1:113372225923:web:89f1028847a561cc2196b6",
  measurementId: "G-ZCZ5C63MJ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export app so it can be imported elsewhere
export { app };
