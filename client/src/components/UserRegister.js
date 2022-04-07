import { useState } from "react";
import {Button,Container} from 'react-bootstrap';
import {USER_API} from '../API.js';



export function UserRegister(){
    
    const [userDet,setUserDet]=useState({
        userName:'',
        email:'',
        password:'',
    });

    function changeHandler(e){

        const {name,value}=e.target;
        setUserDet((prev)=>{
            return {...prev,[name]:value}
        })
        console.log(userDet)
    }

    function formSubmit(e){
        e.preventDefault();
        fetch(`${USER_API}/login`,{
            method:"POST",
            headers:{
                'Content-Type':"Application/json"
            },
            body:JSON.stringify(userDet)
        })
    }

    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <Container style={{width:"25%"}}>
                <h1 className="text-center" >User Register</h1>
                <form  className="d-flex flex-column">
                    <input type={'text'} className='mt-2' name='userName' placeholder='UserName' value={userDet.userName}
                    onChange={changeHandler} />
                    <input type={'email'} className='mt-2'  name='email' placeholder='Email' value={userDet.email}
                     onChange={changeHandler}/>
                    <input type={'password'} className='mt-2'  name='password' placeholder='Password' value={userDet.password}
                    onChange={changeHandler} />
                    <Button className='mt-2' variant="outline-primary" onClick={formSubmit}>Submit</Button>
                </form>
            </Container>
        </div>
    );
}