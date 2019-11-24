import React, {useState, useEffect} from 'react';
import './AddPost.css';
import {connect} from 'react-redux';

import {newPost} from '../../server/server';
import {addPost} from '../../store/redux/actions/actions';

import Wysiwig from '../Wysiwig/Wysiwyg';
import {Button} from 'react-bootstrap';

const AddPost = (props) => {
  const emptyPost = {
    title: "",
    author: "",
    body: "",
    category: "",
    date: ""
  }

  const [bodyField, setBodyField] = useState("");

  const [post, setPost] = useState(emptyPost);

  const [alertAddStatus, setAlertAddStatus] = useState(false);

  useEffect(()=>{
    if(alertAddStatus){
      alert('Post has been added')
    }
    setAlertAddStatus(false);
  },[alertAddStatus])

  const addNewPost = ()=>{

    newPost(post).then((res)=>{
      if(res.status < 400){
        props.createPost(res.data);
        setBodyField("");
        setPost(emptyPost);
        setAlertAddStatus(true);
      }
    });
  }

  const setBody = (data) => {
    setBodyField(data);
    setPost({...post, body: data});
  }

  const updateDataInPost = (e) =>{
    const targetValue = e.target.value;
    switch(e.target.name){
      case "title" : 
        setPost({...post, title: targetValue});
        break;

      case "author" : 
        setPost({...post, author: targetValue});
        break;

      case "category" : 
        setPost({...post, category: targetValue})
        break;

      case "date" : 
        setPost({...post, date: targetValue});
        break;

      default : void(0);
    }
  }

  return(
    <div className="add-post">
      <input type="text" value={post.title} className="add-post-title" name="title" placeholder="Post Title" onChange={e=>updateDataInPost(e)}/>
      <br/>
      <input type="text" value={post.author} className="add-post-author" name="author" placeholder="Post Author" onChange={e=>updateDataInPost(e)}/>
      <Wysiwig value={bodyField} changeArea={setBody}/>
      <select name="category" value={post.category} className="add-post-category" onChange={e=>updateDataInPost(e)}>
        <option value="Other">Other</option>
        <option value="Work">Work</option>
        <option value="Games">Games</option>
        <option value="Home">Home</option>
      </select>
      <br/>
      <input type="date" value={post.date} className="add-post-date" name="date" max="2999-12-31" onChange={e=>{updateDataInPost(e)}}/>
      <br/>
      <Button className="btn btn-submit add-post-submit" onClick={()=>addNewPost()}>Add Post</Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createPost : (payload) => dispatch(addPost(payload))
  }
}

export default connect(null, mapDispatchToProps)(AddPost);