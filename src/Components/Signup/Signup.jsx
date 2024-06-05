import React, { useState } from 'react';

import Logo from '../../logo192.png';
import './Signup.css';
import firebase from 'firebase/app';
import {auth} from '../../firebase/config'



export default function Signup() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form with:', { username, email, password, phone });
    console.log(username)
    auth.createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      console.log('User created:', result.user);
      return result.user.updateProfile({displayName:username})
    })
    .then(()=>{
      console.log('Profile updated successfully');
      alert('Signup successful!');
    })
    .catch((error) => {
      console.error("Error created  ",  error);
    });

  };
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="username"
            name="username"
            
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="phone"
            name="phone"
           
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="password"
            name="password"
           
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
