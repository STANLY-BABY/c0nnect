import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './ReduxStore/reduxStore.js';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById('root'));
// const clientId = process.env.REACT_APP_CLIENT_ID
const clientId = "851518420554-a02ne6kjf7rqbm0p2joguvebcm4k9v6d.apps.googleusercontent.com"

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
    <Routes>
      <Route path ="*" element={<App/>}/>
    </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);


