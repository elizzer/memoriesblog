import { useState } from "react";
import { ADMIN_API, POST_API } from "../../API";
import {useNavigate} from 'react-router-dom';
import { Button,Container,Form,Card } from "react-bootstrap";

export default function AdminLogin({setIsAdmin}){

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
        setIsAdmin(true)
    }

    function toHome(){
        navigate('/')
    }

    return(
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{height:'100vh'}} >
            <Card className="p-5">
                <Card.Header className="m-3">
                    <h1 className="text-center p-1">Admin login</h1>
                </Card.Header>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control onChange={changeHandler} value={logdet.name} name='name' placeholder="Enter User Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={changeHandler} type="password" name='password' value={logdet.password}  placeholder="Admin Password" />
                    </Form.Group>
                    <div  >
                        <Button variant="primary" type="submit">Submit</Button>
                        <Button className="ms-4" onClick={toHome} variant="outline-primary" >Home</Button>
                    </div>
                </Form>
            </Card>
            </Container>
    );
}