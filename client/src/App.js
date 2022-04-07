import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Home from './Home';
import AdminAuth from './adminauth';
import ReadPost from './components/ReadPost';
import {UserRegister} from './components/UserRegister'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
<<<<<<< HEAD
import {USER_API} from './API.js'
import Signin from './components/forms/Signin'
import CreatePost from './components/forms/CreatePost';
import Profile from './components/pages/Profile';
import { UserLoginAuth } from './components/UserLoginAuth';
=======
import {ADMIN_API} from './API.js'
>>>>>>> parent of ed73868 (user registration and signing completed)


function App() {

  const [isAdmin,setIsAdmin]= useState(false)

  useEffect(()=>{
    fetch(`${ADMIN_API}/auth`,{
      method:'GET',
      headers:{
          'Content-Type':"Application/json",
          "authorization":`Bearer ${localStorage.getItem('token')}`
      }
<<<<<<< HEAD
    }).then(res=>res.json())
      .then(res=>{
      if(res.code){
        setIsLogin({
          flag:true,
          id:res.id,
          userName:res.userName
        })
      }
      else{
        setIsLogin({
          flag:false,
          id:"",
          userName:""
        })
      }
    })
=======
}).then(res=>res.json()).then(res=>{
  if(res.err){
      setIsAdmin(false)
  }
  else{
    setIsAdmin(true)
  }
 
})
>>>>>>> parent of ed73868 (user registration and signing completed)
  },[])

  return (
    <BrowserRouter>
            
      <Routes>
        <Route path='/' element={<Home isAdmin={isAdmin} setIsAdmin={setIsAdmin} />}/>
        <Route path='/admin' element={<AdminLogin setIsAdmin={setIsAdmin}/>} />
        <Route path='/create' element={<AdminAuth/>}/>
        <Route path='/register' element={<UserRegister/>}/>
<<<<<<< HEAD
        <Route path='/signin' element={<Signin setIsLogin={setIsLogin}/>}/>
        <Route path='/create' element={<CreatePost isLogin={isLogin}/>}/>
        <Route path='/profile' element={<UserLoginAuth isLogin={isLogin} to="profile"/>}/>
        <Route path='/post/:postId' element={<ReadPost />}/>
=======
        <Route path='/post/:postId' element={<ReadPost isAdmin={isAdmin}/>}/>
>>>>>>> parent of ed73868 (user registration and signing completed)
      </Routes>
    </BrowserRouter>
  );
 
}

export default App;
