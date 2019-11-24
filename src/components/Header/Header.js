import React from 'react';
import './Header.css';

import {
  Link
} from 'react-router-dom';

const Header = () => {
  return(
    <header>
      <div>
        <ul>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/posts/1">First Post</Link></li>
          <li><Link to="/post/new">New Post</Link></li>
          <li><Link to="/post/1">Edit First Post</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Header;