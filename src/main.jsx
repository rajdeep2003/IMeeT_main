import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import "@fontsource/anton"; 
import { Auth0Provider } from '@auth0/auth0-react';

import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Auth0Provider
      domain="dev-jgsawtvpf2vqmlx7.us.auth0.com"
      clientId="pTim8FLK8snpTHsXPfJkoUStnjS38M3Y"
      authorizationParams={{ redirect_uri: window.location.origin }}
      cacheLocation="localstorage"
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </StrictMode>
);
