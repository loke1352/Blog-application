import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
       <BrowserRouter>
     <Provider store={store}>  {/*provider don't know which state to be implement, but we have to implement store
                                 => this store is same as we used in redux  */}
        <App />
     </Provider>
       </BrowserRouter>
     </React.StrictMode>
);


