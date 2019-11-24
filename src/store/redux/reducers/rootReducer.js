import {
  SET_ALL_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from "../actions/actionsType";

const initialState = [];

const reducer = (state = initialState, action)=>{
  switch(action.type){
    case SET_ALL_POSTS: 
      return action.payload;
    case ADD_POST: 
      return [...state, action.payload];
    case UPDATE_POST: 
      return state.map((item)=>{
        if(item.id === action.payload.id){
          return action.payload;
        } else {
          return item;
        }
      })
    case DELETE_POST:
      const temp = [...state].filter((item)=>{
        if(item.id !== action.payload){
          return item;
        }
      });
      return [...temp];
    default : return state;
  }
} 

export default reducer;