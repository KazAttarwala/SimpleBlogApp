import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAOKbDMq_N2sgr9evnixaHVxp5G-2RMFxU",
  authDomain: "simple-react-blog-3479e.firebaseapp.com",
  projectId: "simple-react-blog-3479e",
  storageBucket: "simple-react-blog-3479e.appspot.com",
  messagingSenderId: "484715106539",
  appId: "1:484715106539:web:638bf7194bcc1360f6eeae",
  measurementId: "G-QKD6PMYB4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
