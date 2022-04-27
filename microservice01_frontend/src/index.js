import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Navbar from "./components/navbar";
import Main from "./components/main";
import Footer from "./components/footer";
import reportWebVitals from './reportWebVitals';
import NoPage from "./components/noPage";
import Login from "./components/login";
import Data from "./components/data";
import Plan from "./components/plan";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
              <Route path="data" element={<Data />} />
              <Route path="plan" element={<Plan />} />
              <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
