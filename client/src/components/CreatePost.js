import { useState } from "react";
import {POST_API} from '../API';
import {Modal,Button,Form,Container} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function CreatePost(){
    
   const navigate= useNavigate()
  
    const [postData,setPostData]=useState({
        title:'',
        message:'',
        tags:'',
        photo:null
    })

    const [save,setSave]=useState({
        show:false,
        msg:''
    })

    function changeHandler(e){
        setPostData(prev=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    function photoHandler(e){
        setPostData(prev=>{
            return {...prev,photo:e.target.files[0]}
        })
    }

    function submitHandler(e){
        e.preventDefault();
        const form = new FormData();
        form.append('title',postData.title);
        form.append('message',postData.message);
        form.append('tags',postData.tags);
        form.append('photo',postData.photo);

        fetch(`${POST_API}`,{
            method:"POST",
            headers:{
                Accept:'Application/json'
            },
            body:form
        }).then(res=>res.json()).then(res=>{
            if(res.code){
                setSave({show:true,msg:res.msg})
            }
        })

        setPostData({
            title:'',
            message:'',
            tags:'',
            photo:null
        })

    }

    function modalClosehandler(){
        setSave({show:false,msg:''})
    }

    function toHome(){
        navigate('/')
    }

    return(
        <div>
            <Modal show={save.show} onHide={modalClosehandler} centered >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>{save.msg}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={toHome} >Go to home</Button>
                </Modal.Footer>
            </Modal>
            <h1>Create post</h1>
           
            <Container>

            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name='title' onChange={changeHandler} placeholder="title" value={postData.title} placeholder="Title for the post" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tags">
                    <Form.Label>Tags</Form.Label>
                    <Form.Control type="text" name='tags' onChange={changeHandler} placeholder="tags" value={postData.tags} placeholder="tags" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tags">
                    <Form.Label>Message</Form.Label>
                    <Form.Control name='message' onChange={changeHandler} placeholder="message" value={postData.message} as='textarea' rows='10' placeholder="Give you message about the blog" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="tags">
                    <Form.Label>photo</Form.Label>
                    <Form.Control onChange={photoHandler} type='file' />
                </Form.Group>
                <Button onClick={submitHandler} variant="primary" type="submit">
                    Submit
                </Button>
                <Button onClick={toHome} className='ms-2' variant="outlined-primary" type="submit">
                    Home
                </Button>
            </Form>
            </Container>
        </div>
    );
}