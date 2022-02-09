import React from "react";
import { connect } from "react-redux";

import { fetchPosts } from "../actions";

class PostList extends React.Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div></div>
    );
  }
}

//since I don't have a mapStateToProps, meaining I don't need a state to map here (yet), the first argument is null
export default connect(null, { fetchPosts })(PostList);
