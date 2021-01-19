import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from 'react-dom';
import App from './components/App';

import { CurrentUserProvider } from './components/CurrentUserContext';
import GlobalStyles from "./components/GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
