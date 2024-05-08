import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CombinedContextProvider } from './context/CombinedContext';

ReactDOM.render(
  <BrowserRouter>
    <CombinedContextProvider>
      <App />
    </CombinedContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
