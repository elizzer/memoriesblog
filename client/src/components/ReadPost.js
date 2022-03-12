import { useParams,useNavigate } from "react-router-dom";
import { POST_API } from "../API";
import { useEffect, useState } from "react";
import { Container,Button } from "react-bootstrap";


export default function ReadPost({isAdmin}){

    const param=useParams();
    const navigate=useNavigate();
    const [post,setPost]=useState({});
    useEffect(()=>{
        fetch(`${POST_API}/${param.postId}`,{
            method:"GET",
        }).then(res=>res.json()).then(res=>{
            setPost(()=>{
                return res;
            });
        })

    },[])


    function deletePost(){
        fetch(POST_API+'/'+param.postId,{
            method:'DELETE'
        }).then(res=>res.json()).then(res=>{
           if(res.code){
               navigate('/')
           }
        })
    }

    function likePost(){
        fetch(POST_API+'/like'+param.postId,{
            method:'GET'
        }).then(res=>res.json).then(res=>console.log(res))
    }

    function DeletePost(){
        if(isAdmin)
        return(
            <Button onClick={deletePost} variant="danger">Delete Post</Button>
        );
        else{
            return(
                <Button onClick={likePost} variant="primary">Like Post</Button>
            );
        }
    }

    return(
        <Container>
            <div>
                <h1>{post.title}</h1>
                <DeletePost/>
            </div>
            <p>{post.tags}</p>
            <div className='post-img' >
                <img src={POST_API+'/photo/'+post.photoName} width='100%' height='100%' ></img> 
            </div>
            <p>{post.message}</p>
        </Container>
    );
}