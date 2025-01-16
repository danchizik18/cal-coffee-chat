// index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the change to 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/common/AuthProvider';  // Import the AuthProvider

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap the App component with AuthProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
