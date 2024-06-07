import React, {useEffect, useContext} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import Create from './Pages/Create'
import { AuthContext, FirebaseContext } from './store/Context';
import Home from './Pages/Home';
import { auth } from './firebase/config';
import View from './Pages/ViewPost'
import Post from './store/PostContext'


function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user)
    })
  })
  return (
    <div>

  <Post>

      <Router>

 <Routes>
 <Route exact path='/' element ={<Home/>}/>
 <Route path='/signup' element={<Signup/>}/>
 <Route path='/login' element={<Login/>}/>
 <Route path='/create' element ={<Create/>}></Route>
 <Route path='/view' element={<View/>} ></Route>
 </Routes>


      </Router>
  </Post>
    </div>
  );
}

export default App;
