import { POST_API } from "../API";

export default function posts({posts}){
    return(
        <>
            <div>
                {posts.map(e=>{
                    return (
                        <div>
                            <h1>{e.title}</h1>
                            <h5>{e.tags.map(e=>"#"+e)}</h5>
                            <p>{e.message}</p>
                            <img style={{width:'50%',height:'50%'}} src={POST_API+'/photo/'+e.photoName}></img>
                        </div>
                    );
                })}
            </div>
        </>
    );
}