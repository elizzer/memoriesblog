import Posts from './posts.js';


export default function PopularPost({posts}){
    return (
        <>
            <h1 className='text-center m-4' >Popular posts</h1>
            <hr  className='text-center m-auto mb-3' style={{width:'50%'}}/>
            <Posts posts={posts} wl={100} className={'pop-grid'}/>
        </>
    );
}