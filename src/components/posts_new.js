import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  // field argument is needed to connect the function to the field
  renderField(field) {
    return (
      <div className='form-group'>
        <label>{field.label}</label>
        <input className='form-control'
          type='text'
          {...field.input} //...field is an object that with a lot of biult in props, ex. onchange, onFocus, onBlur
        />
      </div>
    );  
  }

  render() {
    return (
      <div>
        {/* Field component knows how to communicate with reduxForm, but not how to display itself in the DOM */}
        {/* in the component we decide what to display in JSX */}
        <form>
          <Field 
            label='Title:'
            name='title'
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
})(PostsNew);
