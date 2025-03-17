// import React from 'react';
import ReactDOM from 'react-dom/client';  // Note the import change
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ShopContextProvider from './Context/ShopContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </BrowserRouter>
);
