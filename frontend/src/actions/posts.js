import {
  INSERT_POST,
  RETRIEVE_POSTS,
  DELETE_POST, FILTER_POST
} from "./types";
  
  import PostDataService from "../services/post.service";
  
  export const insertPost = (name, description) => async (dispatch, getState) => {
    try {
      const data = {
        id: 0,
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

  export const retrievePosts = () => async (dispatch, getState) => {
    try {
      const res = await PostDataService.getAll();
      dispatch({
        type: RETRIEVE_POSTS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const deletePost = (post) => async (dispatch, getState) => {
    try {
      const data = {
        id: post.id,
        nombre: post.nombre,
        detalle: post.detalle
      }
      const res = await PostDataService.delete(data);
  
      dispatch({
        type: DELETE_POST,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const filterPost = (word) => (dispatch, getState) => {
    const data = {
      word: word
    }
    dispatch({
      type: FILTER_POST,
      payload: data
    });
  }