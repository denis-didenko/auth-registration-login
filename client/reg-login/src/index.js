import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './context/auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './components/App';

const GOOGLE_CLIENT_ID = '999451207139-g6r5h9hmvdl88uu4nal0ojflkup01iqh.apps.googleusercontent.com';
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    // <React.StrictMode>
    <AuthContextProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </AuthContextProvider>
    // </React.StrictMode>
);
