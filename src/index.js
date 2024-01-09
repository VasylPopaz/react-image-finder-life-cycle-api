import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App/App';
import { GlobalStyle } from 'styles/GlobalStyle.styled';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <GlobalStyle />
  </>
);
