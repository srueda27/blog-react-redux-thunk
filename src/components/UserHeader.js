import React from "react";
import { connect } from "react-redux";
import { fetchUser } from "../actions";

class UserHeader extends React.Component {
  componentDidMount() {
    this.props.fetchUser(this.props.userId);
  }

  render() {
    return <div className="header">{this.props.user ? this.props.user.name : ''}</div>
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id == ownProps.userId) }
}

export default connect(mapStateToProps, { fetchUser })(UserHeader);