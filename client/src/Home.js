import { useEffect, useState } from "react";
import {Button, Container} from 'react-bootstrap'


import { POST_API } from "./API";
import PopularPost from "./components/PopularPost";
import RecentPost from "./components/RecentPost";
import NavigationBar from "./components/NavigationBar";
import Footer from './components/Footer.js'
import { useNavigate } from "react-router-dom";

export default function Home({isLogin,setIsLogin}){

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

    function Logout(){
        localStorage.removeItem('token');
        setIsLogin({
            flag:false,
            id:"",
            userName:""
        })
       
    }
    
    function toCreate(){
        navigate('/create');
    }
    
    function toRegister(){
        navigate('/register');
    }

    function toSignin(){
        navigate('/signin');
    }

  

    function Login(){
        if(isLogin.flag){
                    return (
                        <div className="d-flex justify-content-center m-2">
                            <Button onClick={Logout}  variant="outline-dark">Logout</Button>
                            <Button onClick={toCreate} className={'ms-2'} variant="outline-dark">CreatePost </Button>
                        </div>
                        
                    );
        }

        return(
            <div className="d-flex justify-content-center m-2">
                <Button onClick={toRegister}>Register</Button>
                <Button className="ms-2" onClick={toSignin}>Signin</Button>
            </div>
        );
    }

    console.log('[+]All post',post)
    return(
        <div>
            <Container fluid className="d-flex justify-content-evenly">
                <NavigationBar/>
                <Login/>
            </Container>
            <Container >
                <PopularPost  posts={popPost}/>
                <RecentPost posts={post}/>
            </Container>
            <Footer/>
        </div>
    );
}