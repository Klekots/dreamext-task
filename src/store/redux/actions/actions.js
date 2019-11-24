import {
  SET_ALL_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from "./actionsType";

export const setAllPosts = (payload) => {
  return {
    type: SET_ALL_POSTS,
    payload
  }
}
export const addPost = (payload) => {
  return {
    type: ADD_POST,
    payload
  }
}
export const updatePost = (payload) => {
  return {
    type : UPDATE_POST,
    payload
  }
}
export const deletePost = (payload) => {
  return {
    type: DELETE_POST,
    payload
  }
}