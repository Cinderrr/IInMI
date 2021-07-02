import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ListingBidForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error ? 'error' : ''}`;
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
      >
        <Field name="current_price" component={this.renderInput} label="New Bid: $" />
        <button>Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.current_price) {
    errors.current_price = 'You must enter a new price';
  }

  return errors;
};

export default reduxForm({
  form: 'bidForm',
  validate
})(ListingBidForm);
