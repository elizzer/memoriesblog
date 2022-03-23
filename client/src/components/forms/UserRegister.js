import { useState } from "react";
import {Button,Container,Modal} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import {USER_API} from '../../API.js';
import '../style.css'


export function UserRegister(){
    const navigate=useNavigate();
    const [userDet,setUserDet]=useState({
        userName:'',
        email:'',
        password:'',
    });

    const [modal,setModal]=useState({
        msg:"",
        show:false
    })

    function changeHandler(e){

        const {name,value}=e.target;
        setUserDet((prev)=>{
            return {...prev,[name]:value}
        })
        console.log(userDet)
    }

    function formSubmit(e){
        e.preventDefault();
        fetch(`${USER_API}/register`,{
            method:"POST",
            headers:{
                'Content-Type':"Application/json"
            },
            body:JSON.stringify(userDet)
        }).then(res=>res.json()).then(res=>{
            if(res.code){
                setModal({
                    msg:res.msg,
                    show:true
                })
            }
            else{
                setModal({
                    msg:res.err,
                    show:true
                })
            }
        })
    }

    function modalHider(){
        setModal({
            msg:"",
            show:false
        })
    }

    function toSignin(){
        navigate('/signin')
    }

    return(
        <div>
        <Modal show={modal.show} onHide={modalHider}>
            <Modal.Header closeButton>User registration status</Modal.Header>
            <Modal.Body>{modal.msg}</Modal.Body>
        </Modal>
        <div className="d-flex justify-content-center align-items-center " style={{height:'100vh'}}>
            <Container className="bor user-form">
                <h1 className="text-center" >User Register</h1>
                <form  className="d-flex flex-column">
                    <input type={'text'} className='mt-2' name='userName' placeholder='UserName' value={userDet.userName}
                    onChange={changeHandler} />
                    <input type={'email'} className='mt-2'  name='email' placeholder='Email' value={userDet.email}
                     onChange={changeHandler}/>
                    <input type={'password'} className='mt-2'  name='password' placeholder='Password' value={userDet.password}
                    onChange={changeHandler} />
                    <Button className='mt-2' variant="outline-primary" onClick={formSubmit}>Submit</Button>
                    <div className="d-flex  align-items-center gap-2 mt-3">
                        <Button className='mt-2' onClick={toSignin} variant="outline-primary" >SignIn</Button>
                        <p className="m-0">already have an accountt?</p>
                    </div>
                </form>
            </Container>
        </div>
        </div>
    );
}