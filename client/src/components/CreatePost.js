import { useState } from "react";
import {POST_API} from '../API';


export default function CreatePost(){
    
   
  
    const [postData,setPostData]=useState({
        title:'',
        message:'',
        tags:'',
        photo:null
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
        })
    }

    return(
        <div>
            <h1>Create post</h1>
            <form>
                <input name='title' onChange={changeHandler} placeholder="title" value={postData.title} type={"text"}/>
                <input name='tags' onChange={changeHandler} placeholder="tags" value={postData.tags} type={"text"}/>
                <textarea name='message' onChange={changeHandler} placeholder="message" value={postData.message} type={"text"}/>
                <input onChange={photoHandler} type='file'></input>
                <button onClick={submitHandler}>Submit</button>

            </form>
        </div>
    );
}