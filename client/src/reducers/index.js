import { combineReducers } from "redux";

import posts from './posts';    // the post function we are importing here is called reducer in the posts.js file

export default combineReducers({ posts, });