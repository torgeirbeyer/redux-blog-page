import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  // like ngOnInit, will run when component is loaded, one time.
  // called lifeCycle method, another is called 
  // componentWillMount
  componentDidMount = () => {
    this.props.fetchPosts();
  }

  renderPosts(){
    return _.map(this.props.posts, post => {
      return (
        <li className='list-group-item' key={post.id}> 
          {post.title} 
        </li>
      )
    })
  }
  
  render() { 
    return ( 
      <div>
        <h3>Posts</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
     )
  }
}

function mapStateToProps(state) {
  return {posts: state.posts}
}

export default connect(null, { fetchPosts })(PostsIndex);
