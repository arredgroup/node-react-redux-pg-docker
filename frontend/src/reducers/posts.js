import {
    INSERT_POST,
    RETRIEVE_POSTS,
    DELETE_POST
  } from "../actions/types";
  
    const initialState = [];
  
    function postReducer(posts = initialState, action) {
        const { type, payload } = action;
        switch (type) {
            case INSERT_POST:
                return [...posts, payload];
            case RETRIEVE_POSTS:
                return payload;
            case DELETE_POST:
                return posts.filter(({ id }) => id !== payload.id);
            default:
                return posts;
        }
    };

export default postReducer;