import { Button,Container } from "react-bootstrap";
import {useState,useEffect} from "react";
import { POST_API } from "../../API";
import { useNavigate } from "react-router-dom";
import FetchPostById from "../fetchPost/FetchPostById";

export default function Profile({isLogin,setIsLogin}){
    const navigate = useNavigate();
    const [postsId,setPostsId]=useState([]);
    console.log('[+]Profile')
    useEffect(()=>{
        console.log('[+]use effect running')
        fetch(`${POST_API}/posts/${isLogin.id}`,{
            method:"GET",
        }).then(res=>res.json())
        .then(res=>{
            if(res.code){
                setPostsId(res.posts);
                
            }
            else{
                setPostsId([]);
            }
        })
    },[isLogin])
   
    console.log('[+]',isLogin)

    return(
        <div>
            <Container>
                <Container>
                    <h1 className="text-center">{isLogin.userName}</h1>
                </Container>
                    <hr/>
                <div>
                    {postsId.map((e,i)=> {
                        return(
                            <div key={i}>
                                <FetchPostById postId={e}/>
                                <br></br>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}