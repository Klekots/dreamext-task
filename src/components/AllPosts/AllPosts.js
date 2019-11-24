import React, {useState, useEffect} from "react";
import "./AllPosts.css";

import {Link} from "react-router-dom";
import {connect} from "react-redux";
import moment from 'moment';

import {deletePost} from "../../store/redux/actions/actions";
import {removeFromDB} from "../../server/server";

import {Button} from 'react-bootstrap';

const AllPosts = props => {
  
  const [dateSortingStatus, setDateSortingStatus] = useState(false);
  const [titleSortStatus, setTitleSortStatus] = useState(false);

  const [searchString, setSearchString] = useState("");

  const [afterActionPosts, setAfterActionPosts] = useState([]);

  useEffect(()=>{
    setAfterActionPosts(props.posts);
  },[props.posts])

  useEffect(()=>{
    const posts = props.posts || [];

    setAfterActionPosts([...posts].filter(value=>{
      if(value.title.toLowerCase().includes(searchString.toLowerCase())){
        return value;
      }
    }));

  },[searchString, props.posts])

  const delPost = id => {
    removeFromDB(id).then(res => {
      if (res.status < 400) {
        props.removePost(id);
      }
    });
  };

  const sortByDate = posts => {
    const getMiliseconds = date => {
      return moment(date, 'YYYY-MM-DD').valueOf();
    }

    setAfterActionPosts([...posts].sort((a,b)=>{
      if(getMiliseconds(a.date) > getMiliseconds(b.date)){
        if(dateSortingStatus){
          return 1;
        } else {
          return -1;
        }
      } else {
        if(dateSortingStatus){
          return -1;
        } else {
          return 1;
        }
      }
    }))
    setDateSortingStatus(!dateSortingStatus);

  };

  const sortByTitle = posts => {

    setAfterActionPosts([...posts.sort((a,b)=>{
      if(a.title.toLowerCase() > b.title.toLowerCase()){
        if(titleSortStatus){
          return 1;
        } else {
          return -1;
        }
      } else {
        if(titleSortStatus){
          return -1
        } else {
          return 1;
        }
      }
    })]);
    setTitleSortStatus(!titleSortStatus);
  };
  

  return (
    <div className="all-posts">
      <div className="sorting-and-search">
        <input placeholder="Posts search" type="text" onChange={e=>setSearchString(e.target.value)}/>
        <Button className="btn btn-title-sort" onClick={() => sortByTitle(afterActionPosts)}>Title Sort {titleSortStatus ? `↓` : '↑'}</Button>
        <Button className="btn btn-data-sort" onClick={()=> sortByDate(afterActionPosts)}>Date Sort {dateSortingStatus ? `↓` : '↑'}</Button>
      </div>
      <ul>
        {afterActionPosts.map(item => {
          const id = item.id;
          return (
            <li key={id}>
              <span>{item.title}</span>
              <Button className="btn btn-danger btn-delete-custom" onClick={() => delPost(id)}>Delete</Button>
              <Link className="show-link" to={`/posts/${id}`}>Show</Link>
              <Link className="rename-link" to={`/post/${id}`}>Change</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    posts: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removePost: payload => dispatch(deletePost(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);