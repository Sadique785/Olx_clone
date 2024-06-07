import React, { useState, useContext } from 'react';
import {FirebaseContext} from '../../store/Context';
import Logo from '../../logo192.png';
import { auth } from '../../firebase/config';
import { useNavigate } from 'react-router-dom';

import './Login.css';


function Login() {
  const navigate = useNavigate()
  const {firebase} = useContext(FirebaseContext)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    auth.signInWithEmailAndPassword(email, password).then(() => {
      navigate('/')
    })
    .catch((error) => {
      let errorMessage = 'An error occurred';
        try {
          const parsedError = JSON.parse(error.message);
          if (parsedError.error && parsedError.error.message) {
            errorMessage = parsedError.error.message;
          }
        } catch (e) {
          errorMessage = error.message;
        }
        setError(errorMessage);
      });

    
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" ></img>
        <form onSubmit={handleLogin} className="loginForm">
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            value={email}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            value={password}
          />
          <br />
          {error && <small className="errorMessage">{error}</small>}
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
