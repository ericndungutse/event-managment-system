import React from 'react';
import { Toaster } from 'react-hot-toast';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';
import UserProvider from './context/UserContex.jsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <App />
        </QueryClientProvider>
      </BrowserRouter>
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 7000 },
          error: {
            duration: 8000,
          },
          style: {
            fontSize: '16px',
            textAlign: 'center',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'white',
            color: 'black',
          },
        }}
      />
    </UserProvider>
  </React.StrictMode>
);
