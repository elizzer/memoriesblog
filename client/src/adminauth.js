import { useNavigate } from "react-router-dom";
import  CreatePost from './components/CreatePost'
import {ADMIN_API} from './API';


export default function AdminAuth(){
    
    const navigate=useNavigate()

    fetch(`${ADMIN_API}/auth`,{
            method:'GET',
            headers:{
                'Content-Type':"Application/json",
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
    }).then(res=>res.json()).then(res=>{
        if(res.err){
            navigate('/admin');
        }
       
    })
    
    return <div>
       <CreatePost/>
    </div>
  

}