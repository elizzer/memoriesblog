import { useEffect, useState } from "react";
import { POST_API } from "./API";
import {Container} from 'react-bootstrap'
import { LandingImageSlider } from "./components/LandingImageSlider";
import PopularPost from "./components/PopularPost";
import RecentPost from "./components/RecentPost";

export default function Home(){

    const [post, setPost]=useState([]);
    const [popPost,setPopPost]=useState([]);
    useEffect(()=>{
        console.log('[+]fetchin posts')
        fetch(POST_API,{
            method:"GET",
        }).then(res=>res.json()).then(res=>{
            setPost(()=>{
                return res;
            });
        })
        fetch(POST_API+'/popular',{
            method:"GET",
        }).then(res=>res.json()).then(res=>{
            setPopPost(()=>{
                return res;
            });
        })

    },[])


    console.log('[+]All post',post)
    // const popPost=post.slice(0,4);
    return(
        <div>
           
            <LandingImageSlider/>
            <Container fluid>
                <PopularPost posts={popPost}/>
                <RecentPost posts={post}/>
            </Container>
            
        </div>
    );
}