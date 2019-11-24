import React from 'react';
import './Sidebar.css';

import {
  Link
} from 'react-router-dom';

const Sidebar = () => {
  return(
    <aside>
      <div>
        <ul>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/posts/1">First Post</Link></li>
          <li><Link to="/post/new">New Post</Link></li>
          <li><Link to="/post/1">Edit First Post</Link></li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar;