
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {AmplifyAuthenticator, AmplifyAuthContainer, AmplifySignOut,AmplifySignIn} from "@aws-amplify/ui-react";
import {AmplifyChatbot} from "@aws-amplify/ui-react";


ReactDOM.render(
  <AmplifyAuthContainer>
    <AmplifyAuthenticator>
      <AmplifySignIn
        headerText="My Custom Sign In Text"
        slot="sign-in">
       </AmplifySignIn>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AmplifyAuthenticator>
  </AmplifyAuthContainer>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
