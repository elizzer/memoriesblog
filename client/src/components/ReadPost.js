import { useParams,useNavigate } from "react-router-dom";
import { POST_API } from "../API";
import { useEffect, useState } from "react";
import { Container,Button } from "react-bootstrap";


export default function ReadPost({isAdmin}){

    const param=useParams();
    const navigate=useNavigate();
    const [post,setPost]=useState({message:[]});
    
    useEffect(()=>{
        console.log('[+]use effect')
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
        fetch(POST_API+'/like/'+param.postId,{
            method:'GET'
        }).then(res=>res.json()).then(res=>console.log(res))
    }

    function DeletePost(){
        if(isAdmin)
        return(
            <Button onClick={deletePost} className='ps-4 pe-4 mb-2' variant="danger">Delete Post</Button>
        );
        else{
            return(
                <Button onClick={likePost} variant="primary" className='ps-4 pe-4 mb-2'>Like</Button>
            );
        }
    }

    return(
        <Container>
            <div>
                <h1>{post.title}</h1>
                <DeletePost/>
            </div>
           <div className='post-img mb-5' >
                <img src={POST_API+'/photo/'+post.photoName} alt=' ' width='100%' height='100%' ></img> 
            </div>
            <div style={{whiteSpace:'pre-line'}}>{post.message}</div>
        </Container>
    );
}