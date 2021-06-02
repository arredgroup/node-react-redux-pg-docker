import {
    INSERT_POST,
    RETRIEVE_POSTS,
    DELETE_POST
  } from "./types";
  
  import PostDataService from "../services/post.service";
  
  export const insertPost = (name, description) => async (dispatch) => {
    try {
      const data = {
        nombre: name, 
        detalle: description
      }
      const res = await PostDataService.insert(data);
      dispatch({
        type: INSERT_POST,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const retrievePosts = () => async (dispatch) => {
    try {
      const res = await PostDataService.getAll();
      dispatch({
        type: RETRIEVE_POSTS,
        payload: res.data,
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  export const deletePost = (id) => async (dispatch) => {
    try {
      await PostDataService.delete(id);
  
      dispatch({
        type: DELETE_POST,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };