import { useState } from "react";
import { ADMIN_API, POST_API } from "./API";
import {useNavigate} from 'react-router-dom';
import { Button } from "react-bootstrap";

export default function AdminLogin(){

    const navigate = useNavigate();

    const [logdet,setLogdet]=useState({
        name:'',
        password:''
    })

    function changeHandler(e){
        setLogdet(prev=>{
            return {...prev,[e.target.name]:e.target.value};
        });
    }
    
    function submitHandler(e){
        e.preventDefault();
        console.log(ADMIN_API);
        fetch(ADMIN_API,{method:'POST',headers:{'Content-type':'Application/json'},body:JSON.stringify(logdet)})
        .then(res=>res.json())
        .then(res=>{
            if(res.token){
                localStorage.setItem("token",res.token);
                navigate('/create');
            }
        })
    }

    function toHome(){
        navigate('/')
    }

    return(
        <div>
            <h1>Admin login</h1>
            <form>
                <input id='name' name='name' placeholder="name" value={logdet.name} onChange={changeHandler} type={"text"}/>
                <input id='Password' placeholder="name" name='password' value={logdet.password} onChange={changeHandler} type={"text"}/>
                <Button onClick={submitHandler}>Submit</Button>
                <Button onClick={toHome}>Go to home</Button>
            </form>
        </div>
    );
}