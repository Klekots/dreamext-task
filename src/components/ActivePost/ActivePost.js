import React, {useState, useEffect} from "react";
import './ActivePost.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import parse from "html-react-parser";

const ActivePost = props => {
  const [renderPost, setRenderPost] = useState({error: "404 - post not find"});

  useEffect(() => {
    const postID = parseInt(props.match.params.id);
    const obj = props.posts.find((value)=> value.id === postID) || {body: ""};

    if(Object.keys(obj).length > 1){
      setRenderPost(obj);
    } else {
      setRenderPost({error: "404 - post not find"});
    }
  }, [props]);

  const whatRender=()=>{
    if (Object.keys(renderPost).indexOf('error') === -1){
      return(
        <>
          <p className="alert-info">{`Title: ${renderPost.title}`}</p>
          <p className="alert-info">{`Author: ${renderPost.author}`}</p>
          <p className="alert-info">{`Category: ${renderPost.category}`}</p>
          <p className="alert-info">{`Date of creating: ${renderPost.date}`}</p>
          <div className="body-place">
          <p>Body field:</p>
            {parse(renderPost.body)}
          </div>
        </>
      )
    }
    else {
      return(
          <p className="alert-danger">{renderPost.error}</p>
      )
    }
  }

  return (
    <div className="active-post">
      {whatRender()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state
  };
};

export default connect(mapStateToProps)(withRouter(ActivePost));