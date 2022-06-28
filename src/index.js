import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import App from './App';
import Store ,{persistor} from "./Store";
// import showResults from "./showResults";
import { PersistGate } from 'redux-persist/integration/react';
// import ContactForm from './ContactForm';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
    {/* <ContactForm onSubmit={showResults}/> */}
        <PersistGate  persistor={persistor}>
      <App/>
      
      </PersistGate>
    </Provider>
  </React.StrictMode>,
    
  
  document.getElementById('root')
);
