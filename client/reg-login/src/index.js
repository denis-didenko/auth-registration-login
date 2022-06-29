import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/auth';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    // <React.StrictMode>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    // </React.StrictMode>
);
