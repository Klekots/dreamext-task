import axios from 'axios';

import {addModel, updateModel} from './models';

export const getPosts = async () => {
  return await axios.get('http://localhost:3000/posts')
    .then((res)=>{return res});
}

export const newPost = async (body) => {
  return await axios.post('http://localhost:3000/posts', addModel(body))
    .then((res)=>{return res});
}

export const editPost = async (body) => {
  return await axios.put(`http://localhost:3000/posts/${body.id}`, updateModel(body))
    .then((res)=>{return res});
}

export const removeFromDB = async (id) => {
  return await axios.delete(`http://localhost:3000/posts/${id}`)
    .then((res)=>{return res});
}