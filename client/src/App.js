import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './Home';
import ReadPost from './components/ReadPost';
import {UserRegister} from './components/forms/UserRegister'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {USER_API} from './API.js'
import Signin from './components/forms/Signin'
import CreatePost from './components/forms/CreatePost';


function App() {

  const[isLogin,setIsLogin]=useState({
    flag:false,
    id:"",
    userName:"",
  })

  useEffect(()=>{
    fetch(`${USER_API}/userauth`,{
      method:"GET",
      headers:{
        "Content-type":"Application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
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
  },[])
 
  return (
    <BrowserRouter>
            
      <Routes>
        <Route path='/' element={<Home isLogin={isLogin} setIsLogin={setIsLogin} />}/>
        <Route path='/register' element={<UserRegister/>}/>
        <Route path='/signin' element={<Signin setIsLogin={setIsLogin}/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        {/* <Route path='/post/:postId' element={<ReadPost isAdmin={isAdmin}/>}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
