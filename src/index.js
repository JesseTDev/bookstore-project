import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './shared/contexts/UserContext';
import { CartProvider } from './shared/contexts/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
    <UserProvider>
    <App />
    </UserProvider>
    </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
