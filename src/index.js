import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience='https://dev-fr6jryvyt566z45z.us.auth0.com/api/v2/'
    scope="openid profile email"
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
