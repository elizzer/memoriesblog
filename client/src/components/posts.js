import { Col, Container } from "react-bootstrap";
import { POST_API } from "../API";
import Post from "./Post";
import './style.css'
export default function posts({posts}){
    return(
        <Container fluid >
            <Col className="gridPost" >
                {posts.map(post=>{
                    return (
                       <Post post={post}/>
                    );
                })}
            </Col>
        </Container>
    );
}