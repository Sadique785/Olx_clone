import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/FirebaseContext';
import Firebase from './firebase/config';

ReactDOM.render(<FirebaseContext.Provider value={{Firebase}}>
        <App />
    </FirebaseContext.Provider>
    , document.getElementById('root'));
