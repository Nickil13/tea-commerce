import React from 'react';
import ReactDOM from 'react-dom';
import './styles/sass/main.scss';
import App from './App';
import { AppProvider } from './context';
import {Provider} from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
      <AppProvider>
        <App />
      </AppProvider>
    </Provider>,
  document.getElementById('root')
);


