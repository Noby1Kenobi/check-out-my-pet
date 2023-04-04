import React from "react";
import Post from './Post/Post';

import useSytles from './styles';

const Posts = () => {
    const classes = useSytles();
    
    return (
        <>
            <h1>Posts</h1>
            <Post />
            <Post />
        </>
    );
}

export default Posts;