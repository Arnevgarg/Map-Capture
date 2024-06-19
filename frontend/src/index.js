import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import App from './App';
import reportWebVitals from './reportWebVitals';

const clerkFrontendApi = 'pk_test_ZW1lcmdpbmctdGFycG9uLTUuY2xlcmsuYWNjb3VudHMuZGV2JA';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
    <SignedIn>
      <App />
    </SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </ClerkProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
