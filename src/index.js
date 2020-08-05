import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import App from './App';


import './App.css';
import './assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

import { store } from './redux/store';

import { verifyCredentials } from './redux/actions/redux-token-auth-config';

// verifyCredentials(store);
ReactDOM.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementById('root'));

// to work offline and load faster, change
// unregister() to register() below.
