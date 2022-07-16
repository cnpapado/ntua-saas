import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NoPage from "./components/noPage";

import Data from "./components/data";
import Plan from "./components/plan";
import Map from "./components/MyMap";
import Protected from "./firebase/components/Protected"

import { AuthContextProvider } from './context/AuthContext';

import SignIn from './components/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
	  <BrowserRouter>
          <Routes>
			  <Route path="/" element={<SignIn />} />
              <Route path="data" element={<Protected><Data /></Protected>} />
              <Route path="plan" element={<Protected><Plan /></Protected>} />
              <Route path="map" element={<Protected><Map /></Protected>} />
              <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
	</AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
