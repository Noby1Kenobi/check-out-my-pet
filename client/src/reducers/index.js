import { combineReducers } from "redux";

import posts from './posts';    // the post function we are importing here is called reducer in the posts.js file
import auth from './auth';

export default combineReducers({ posts, auth, });