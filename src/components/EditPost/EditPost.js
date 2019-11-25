import React, {useState, useEffect} from 'react';
import './EditPost.css';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'; 

import {updatePost} from '../../store/redux/actions/actions';
import {editPost} from '../../server/server';

import Wysiwig from '../Wysiwig/Wysiwyg';
import {Button} from 'react-bootstrap';

const EditPost = (props) => {

  const emptyPost = {
    title: "",
    author: "",
    date: "",
    category: "",
    id: ""
  }

  const [bodyField, setBodyField] = useState("");
  const [post, setPost] = useState(emptyPost);
  const [postStatus, setPostStatus] = useState(false);
  const [postUpdateStatus, setPostUpdateStatus] = useState(false);

  useEffect(()=>{
    const postID = parseInt(props.match.params.id);
    const postForEdition = props.posts[postID-1];
    
    if(postForEdition && !postUpdateStatus){
      setBodyField(postForEdition.body);
      setPost({
        title: postForEdition.title,
        author: postForEdition.author,
        date: postForEdition.date,
        body: bodyField,
        category: postForEdition.category,
        id: postForEdition.id
      });
      setPostStatus(true);
    } else {
      setPostStatus(false);
    }
  },[props.posts]);

  useEffect(()=>{
    if(postUpdateStatus){
      alert("Post has been update")
    }
  },[postUpdateStatus])

  const updatePost = () =>{
    editPost({...post, body: bodyField})
      .then((res)=>{
        if(res.status < 400){
          props.updatePost(res.data);
          setPostUpdateStatus(true);
          setPost(emptyPost);
          setBodyField("");
        }
      })
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

  const whatRender = () =>{
    if(postStatus){
      return(
        <>
          <input type="text" name="title" className="edit-post-title" value={post.title} onChange={e=>updateDataInPost(e)}/>
          <br/>
          <input type="text" name="author" className="edit-post-author" value={post.author} onChange={e=>updateDataInPost(e)}/>
          <Wysiwig value={bodyField} changeArea={setBodyField}/>
          <select name="category" className="edit-post-category" value={post.category} onChange={e=>updateDataInPost(e)}>
            <option value="Other">Other</option>
            <option value="Work">Work</option>
            <option value="Games">Games</option>
            <option value="Home">Home</option>
          </select>
          <br/>
          <input type="date" className="edit-post-date" name="date" max={"2999-12-31"} value={post.date} onChange={e=>updateDataInPost(e)}/>
          <br/>
          <Button className="edit-post-submit" onClick={()=>updatePost()}>Update Post</Button>
        </>
      )
    }
    else{
      return(
        <>
          <p className="alert-danger uknown-post">Post not found</p>
        </>
      )
    }
  }

  return(
    <div className="edit-post">
      {whatRender()}
    </div>
  )
}

const mapStateToProps = state => {
  return{
    posts: state
  }
}

const mapDispatchToProps = dispatch => {
  return{
    updatePost : (payload) => dispatch(updatePost(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPost));
