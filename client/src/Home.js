import { useEffect, useState } from "react";
import { POST_API } from "./API";

export default function Home(){

    const [post, setPost]=useState([]);

    useEffect(()=>{
        fetch(POST_API,{
            method:"GET",
        }).then(res=>res.json()).then(res=>{
            setPost(()=>{
                return res;
            });
        })

    },[])


    console.log('[+]All post',post)

    return(
        <div>
            <h1>Home page</h1>
            <div>{post.map((e)=>{
                return e.title
            })}</div>
        </div>
    );
}