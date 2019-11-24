import React, {useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import {Provider} from 'react-redux';
import {applyMiddleware, compose, createStore} from 'redux';

import rootReducer from '../../store/redux/reducers/rootReducer';

import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import AllPosts from '../AllPosts/AllPosts';
import ActivePost from '../ActivePost/ActivePost';
import AddPost from '../AddPost/AddPost';
import EditPost from '../EditPost/EditPost';

import {setAllPosts} from '../../store/redux/actions/actions';

import {getPosts} from '../../server/server';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware());
const store = createStore(rootReducer, enhancer);

const App = () =>{

  useEffect(()=>{
    async function getData() {
      return await getPosts().then(res => store.dispatch(setAllPosts(res.data)))
    };
    getData();
  },[]);
  
  return(
    <div className="app">
      <Provider store={store}>
      <Router>
      <Header></Header>
      <Sidebar></Sidebar>
        <Switch>
          <Route path="/posts" exact>
            <AllPosts />
          </Route>
          <Route path="/post/new">
            <AddPost />
          </Route>
          <Route path="/posts/:id">
            <ActivePost />
          </Route>
          <Route path="/post/:id">
            <EditPost />
          </Route>
        </Switch>
      </Router>
      </Provider>
    </div>
  )
}

export default App;