import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import reportWebVitals from './reportWebVitals';

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider value={defaultSystem}>
        <App />
  </ChakraProvider>
);

reportWebVitals();
