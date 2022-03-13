import { useEffect, useState } from "react";
import { POST_API } from "./API";
import {Button, Container} from 'react-bootstrap'
import { LandingImageSlider } from "./components/LandingImageSlider";
import PopularPost from "./components/PopularPost";
import RecentPost from "./components/RecentPost";
import NavigationBar from "./components/NavigationBar";
import Footer from './components/Footer.js'
import { useNavigate } from "react-router-dom";

export default function Home({isAdmin,setIsAdmin}){

    const navigate=useNavigate();
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

    function adminLogout(){
        localStorage.removeItem('token');
        setIsAdmin(false);
    }
    
    function toCreate(){
        navigate('/create');
    }

    function Logout(){
        if(isAdmin){
            return (
                <div className="d-flex justify-content-center">
                    <Button onClick={adminLogout}  variant="outline-dark">Admin Logout</Button>
                    <Button onClick={toCreate} className={'ms-2'} variant="outline-dark">CreatePost </Button>
                </div>
                
            );
        }
        else{
            return null;
        }
    }

    console.log('[+]All post',post)
    return(
        <div>
            <Container fluid className="d-flex justify-content-evenly">
                <NavigationBar/>
                <Logout/>
            </Container>
            <LandingImageSlider/>
            <Container >
                <PopularPost  posts={popPost}/>
                <RecentPost posts={post}/>
            </Container>
            <Footer/>
        </div>
    );
}