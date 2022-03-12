import { useParams,useNavigate } from "react-router-dom";
import { POST_API } from "../API";
import { useState } from "react";
import { Container } from "react-bootstrap";


export default function ReadPost(){

    const param=useParams();
    const navigate=useNavigate();
    const [post,setPost]=useState({});
    fetch(POST_API+'/'+param.postId).then(res=>res.json()).then(res=>{
        if(res.err){
            navigate('/')
        }
        setPost(()=>{
            return {...res}
        });
    })

    return(
        <Container>
            <h1>{post.title}</h1>
            <p>{post.tags}</p>
            <div className='post-img' >
                <img src={POST_API+'/photo/'+post.photoName} width='100%' ></img> 
            </div>
            <p>{post.message}</p>
        </Container>
    );
}