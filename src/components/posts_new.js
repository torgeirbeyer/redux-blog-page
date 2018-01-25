import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  // field argument is needed to connect the function to the field
  renderField(field) {
    // extract the meta and touched from the field to make it nicer!
    const { meta : { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className='form-control'
          type='text'
          {...field.input} //...field is an object that with a lot of biult in props, ex. onchange, onFocus, onBlur
        />
        {/* meta.error and meta.touched is automatically added to the field object */}
        {/* to not show error message before the field is touched */}
        <span className='text-help'>
          {touched ? error : ''}
        </span>
      </div>
    );  
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      // history.push will redirect back to the specified location
      // put it in a callback function to make sure it desnt run before the post is created
      // needs to be added to the action function as well
      this.props.history.push('/');
    });

  }

  render() {
    // property from reduxForm
    const {handleSubmit} = this.props;
    
    return (
      <div>
        {/* Field component knows how to communicate with reduxForm, but not how to display itself in the DOM */}
        {/* in the component we decide what to display in JSX and communicate with API or backend*/}
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field 
            label='Title:'
            name='title' // this property must be identically named in field and validatefunction for errors to work
            component={this.renderField}
          />
          <Field 
            label='Categories:'
            name='categories'
            component={this.renderField}
          />
          <Field 
            label='Content:'
            name='content'
            component={this.renderField}
          />
          <button type='submit' className='btn btn-primary'>Save</button>
          <Link to='/' className='btn btn-danger'>Cancel</Link>
        </form>
      </div>
    );
  }
}

// this function will be called when the user tries to submit the form
// the argument is called values by convention
function validate(values) {
  const errors = {};
  // Validate the inputs from 'values
  if(!values.title) {
    errors.title = 'Enter a title';
  }
  if(!values.categories) {
    errors.categories = 'Enter som categories';
  }
  if(!values.content) {
    errors.content = 'Enter some content';
  }
  // If errors is empty, the form is fine to submit
  // If errors has any properties, redux form assumes for is invalid
  return errors;
}

// we need to connect the reduxForm to the component
// it take one argument which is a function
// we name the form with a unique string
// if we show multiple forms at the same time redux will now what forms is what
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
