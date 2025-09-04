import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@fontsource/anton";
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Auth0Provider
        domain="dev-jgsawtvpf2vqmlx7.us.auth0.com"
        clientId="pTim8FLK8snpTHsXPfJkoUStnjS38M3Y"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        cacheLocation="localstorage"
      >
        <App />
      </Auth0Provider>
    </Router>
  </StrictMode>
);
