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

export const fetchUser = userId => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);

  dispatch({
    type: 'FETCH_USER',
    payload: response.data
  })
}

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  _.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(userId => dispatch(fetchUser(userId)))
    //to execute the chain the value() is necesary
    .value()
}
