import React from 'react';
import ReactDOM from 'react-dom/client';
import ReducerProvider from './context/ReducerProvider';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ReducerProvider>
      <App />
    </ReducerProvider>
  </React.StrictMode>
);