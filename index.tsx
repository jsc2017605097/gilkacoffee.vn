
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AdminApp from './admin/AdminApp';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const root = ReactDOM.createRoot(rootElement);

const path = window.location.pathname;
const isAdmin = path === '/admin';

root.render(
  <React.StrictMode>
    {isAdmin ? <AdminApp /> : <App />}
  </React.StrictMode>
);
