import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; // link allows us to create links in react
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  // like ngOnInit, will run when component is loaded, one time.
  // called lifeCycle method, another is called 
  // componentWillMount
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    return _.map(this.props.posts, post => {
      return (
        <li className='list-group-item' key={post.id}> 
        <Link to={`/posts/${post.id}`}>
            {post.title}
        </Link>
          </li>
      );
    });
  }
  
  render() { 
    return ( 
      <div>
        <div className='text-xs-right'>
          {/* link is reacts anchortag. specify where to go with the to=''-property */}
          <Link className='btn btn-primary' to='/posts/new'>
           Add a post!
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className='list-group'>
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {posts: state.posts};
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
