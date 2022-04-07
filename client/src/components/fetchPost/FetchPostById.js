import { useEffect, useState } from "react";
import { POST_API } from "../../API";
import Post from "../Post";

export default function FetchPostById({postId}){
    const [post,setPost]=useState({});
    useEffect(()=>{
        fetch(`${POST_API}/${postId}`,{
            method:"GET"  
        }).then(res=>res.json())
        .then(res=>setPost(res))
    },[postId]);
    console.log("[+]Post from profile posts",post)
if(post.title!==null)
    return(
        <div>
            <Post post={post} wl={20}/>
        </div>
    );

else
    return null;
}