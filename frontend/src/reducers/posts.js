import {
    INSERT_POST,
    RETRIEVE_POSTS,
    DELETE_POST,
    FILTER_POST
  } from "../actions/types";
  
    const initialState = {
        data: []
    };
  
    function postReducer(posts = initialState, action) {
        const { type, payload } = action;
        switch (type) {
            case INSERT_POST:
                return {...posts};
            case RETRIEVE_POSTS:
                return {...posts, data:payload};
            case DELETE_POST:
                return {...posts, data:posts.data.filter(({id}) => id !== payload.id)};
            case FILTER_POST:
                return {...posts, data:posts.data.filter((post) => post.nombre.indexOf(payload.word) !== -1)}
            default:
                return posts;
        }
    }

export default postReducer;