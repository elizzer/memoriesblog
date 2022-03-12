import Posts from './posts.js';

export default function PopularPost({posts}){
    return (
        <>
            <h1>Popular posts</h1>
            <Posts posts={posts} />
        </>
    );
}