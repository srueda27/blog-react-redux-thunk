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

export const fetchUser = userId => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);

  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  })
}

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const uniqueUsers = _.uniq(_.map(getState().posts, 'userId'));
  uniqueUsers.forEach(userId => dispatch(fetchUser(userId)));
}
