import { useState } from "react";
import {ADMIN_API} from '../API';
import {useNavigate} from 'react-router-dom'


export default function CreatePost(){
    
    const navigate = useNavigate();
   
    function AdminAuth(){
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
    }


    AdminAuth();
    const [postData,setPostData]=useState({
        title:'',
        message:'',
        tags:'',
    })

    function changeHandler(e){
        setPostData(prev=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }


    return(
        <div>
            <h1>Create post</h1>
            <form>
                <input name='title' onChange={changeHandler} placeholder="title" value={postData.title} type={"text"}/>
                <textarea name='message' onChange={changeHandler} placeholder="message" value={postData.message} type={"text"}/>
                <input name='tags' onChange={changeHandler} placeholder="tags" value={postData.tags} type={"text"}/>
                <button>Submit</button>

            </form>
        </div>
    );
}