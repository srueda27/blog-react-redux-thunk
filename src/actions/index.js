import _ from "lodash";

import jsonPlaceholder from "../apis/jsonPlaceholder";

//DO NOT try to use await and async promise handlers on action creators, without using the middleware
// 
export const fetchPosts = () => {
  return async dispatch => {
    const response = await jsonPlaceholder.get('/posts');

    //Using a middleware I need to dispatch the function into it 
    dispatch({
      type: 'FETCH_POSTS',
      payload: response.data
    });
  }
}
//A good refactor 
/* export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get('/posts');

  //Using a middleware I need to dispatch the function into it 
  dispatch({
    type: 'FETCH_POSTS',
    payload: response
  });
}
 */

export const fetchUser = (userId) => (dispatch) => {
  _fetchUser(userId, dispatch);
}

//This will limit us to only 1 fetch of the same user, during the entire use of the application
// so if you'd like to fetch it again, you wouldn't be able to do it
const _fetchUser = _.memoize( async (userId, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);

  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  })
});
