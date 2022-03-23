import { useState } from "react";
import { Button, Container,Form,Modal } from "react-bootstrap";
import { USER_API } from "../../API";
import {useNavigate} from "react-router-dom";
import '../style.css'

export default function Signin({setIsLogin}){
    const navigate=useNavigate();
    const [logDet,setlogDet]=useState({
        email:'',
        password:'',
    })

   
    const[modal,setModal]=useState({
        msg:"",
        show:false
    })
    function changeHandler(e){
        setlogDet((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    function submitHandler(){
        fetch(`${USER_API}/signin`,{
            method:'POST',
            headers:{
                'Content-Type':"Application/json"
            },
            body:JSON.stringify(logDet)
        }).then(res=>res.json()).then(res=>{
            if(res.code){
                localStorage.setItem('token',res.token)
                setIsLogin({
                    flag:true,
                    id:res.id,
                    userName:res.userName
                })
                setModal({
                    msg:res.msg,
                    show:true
                })
                navigate('/');
            }
            else{
                setIsLogin({
                    flag:false,
                    id:"",
                    userName:""
                })
                setModal({
                    msg:res.err,
                    show:true
                })
                localStorage.removeItem('token')
            }
        })
    }

    function onHide(){
        setModal(prev=>{
            return{...prev,show:false}
        })
    }

    function toRegister(){
        navigate("/register")
    }

    return(
        <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
        <Modal show={modal.show} onHide={onHide}  centred>
            <Modal.Header closeButton>
                SignIn status
            </Modal.Header>
            <Modal.Body>{modal.msg}</Modal.Body>
        </Modal>
        <Container className="bor user-form">
            <h1 className="text-center" >User Signin</h1>
            <form  className="d-flex flex-column">
                 <input type={'email'} onChange={changeHandler} value={logDet.email}  className='mt-2'  name='email' placeholder='Email' />
                <input type={'password'} value={logDet.password} onChange={changeHandler} className='mt-2'  name='password' placeholder='Password'/>
                <Button className='mt-2' onClick={submitHandler} variant="outline-primary" >Submit</Button>
                <div className="d-flex  align-items-center gap-2 mt-3">
                    <Button className='mt-2' onClick={toRegister} variant="outline-primary" >Register</Button>
                    <p className="m-0">haven't registered yet?</p>
                </div>
            </form>
        </Container>
    </div>
    );
}