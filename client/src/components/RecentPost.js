import Posts from './posts.js';

export default function ReacentPost({posts}){
    return(
        <>
            <h1>New posts</h1>
            <Posts posts={posts} />
        </>
    );
}