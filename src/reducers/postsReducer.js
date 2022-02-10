//Reducer must return any value beside 'undefined'
//Reducers must not go outside this document
//Reducer must not mutate state, return a modified-copy of the state.
//Basic Reducer => (state, action)
export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.payload;
    default:
      return state;
  }
}
