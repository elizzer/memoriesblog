import { Col, Container } from "react-bootstrap";
import { POST_API } from "../API";
import Post from "./Post";
import './style.css'
export default function posts({posts,wl,className}){
    return(
        <Container fluid >
            <Col className={className} >
                {posts.map((post,i)=>{
                    return (
                       <Post key={i} post={post} wl={wl}/>
                    );
                })}
            </Col>
        </Container>
    );
}