import './style.css'
import { POST_API } from "../API";
import { Card,Button,Badge } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
export default function Post({post}){

    const navigate=useNavigate();

    const postMsg=post.message.slice(0,250);

    function readMore(){
       navigate('/post/'+post._id);
       console.log(post._id)
    }


    return(
        <div className='m-1 c-p'>
           <Card onClick={readMore} style={{ width: '100%' ,height:'100%' }}>
                <Card.Img width={'300px'} height={'300px'} variant="top" src={POST_API+'/photo/'+post.photoName} />
                <Card.Body className='d-flex flex-column justify-content-between ' >
                    <div>
                        <Card.Title>{post.title}</Card.Title>
                        <Card.Text className="h6">{post.tags.map(e=>'#'+e+'')}</Card.Text>
                        <Card.Text>{postMsg}</Card.Text>
                    </div>
                    <div className='d-flex justify-content-between'>
                    <Badge className='d-flex align-items-center ps-3 pe-3' bg="secondary">{post.likeCount} likes</Badge>
                    <Button onClick={readMore}  variant="primary">Read More</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}