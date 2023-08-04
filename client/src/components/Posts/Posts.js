import React from "react";
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { useSelector } from "react-redux";

import Post from './Post/Post';
import useSytles from './styles';

const Posts = ({ setCurrentId }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const classes = useSytles();

    if (!posts.length && !isLoading) return 'No posts';
    
    return (
        isLoading ? (
            <div className={classes.loadingDiv}>
                <CircularProgress />
                <Typography className={classes.smMargin} variant="h6" align="center">
                    Please be patient as the server takes some time to start up (Approx. 1 min)
                </Typography>
            </div>
            ) : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;