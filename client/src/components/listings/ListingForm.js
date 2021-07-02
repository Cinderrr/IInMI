import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ListingForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderTextInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field
          name="description"
          component={this.renderTextInput}
          label="Enter Description"
        />
        <Field
          name="tag"
          component={this.renderTextInput}
          label="Enter tag"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.description) {
    errors.description = 'You must enter a title';
  }

  if (!formValues.tag) {
    errors.tag = 'You must enter a description';
  }

  return errors;
};

export default reduxForm({
  form: 'listingForm',
  validate
})(ListingForm);
