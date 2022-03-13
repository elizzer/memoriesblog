import {BrowserRouter,Routes,Route} from 'react-router-dom';
import AdminLogin from './AdminLogin';
import Home from './Home';
import AdminAuth from './adminauth';
import ReadPost from './components/ReadPost';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {ADMIN_API} from './API.js'


function App() {

  const [isAdmin,setIsAdmin]= useState(false)

  useEffect(()=>{
    fetch(`${ADMIN_API}/auth`,{
      method:'GET',
      headers:{
          'Content-Type':"Application/json",
          "authorization":`Bearer ${localStorage.getItem('token')}`
      }
}).then(res=>res.json()).then(res=>{
  if(res.err){
      setIsAdmin(false)
  }
  else{
    setIsAdmin(true)
  }
 
})
  },[])

  return (
    <BrowserRouter>
            
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/create' element={<AdminAuth/>}/>
        <Route path='/post/:postId' element={<ReadPost isAdmin={isAdmin}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
