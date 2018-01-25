import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchPost, deletePost } from "../actions";

class PostsShow extends Component {
  componentDidMount() {
    // to prevent requesting posts all the time
    if(!this.props.post) {
      const {id} = this.props.match.params; //.match provided by react router
      this.props.fetchPost(id);
    }
  }

  onDeleteClick() {
    const {id} = this.props.match.params; //.match provided by react router

    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;
    
    // needed because of time
    if(!post) {
      return <div>LOADING...</div>
    }

    return (
      <div>
        <Link to='/' className='btn btn-primary'>Home</Link>
        <button
          className='btn btn-danger pull-xs-right'
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// first arg in mapStateToPRops is the state, the second is caled ownProps by convention
// it is the props that is headed to the component     this.props === ownProps;
function mapStateToProps({posts}, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);