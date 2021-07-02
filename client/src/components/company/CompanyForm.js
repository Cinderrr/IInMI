import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CompanyForm extends React.Component {
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
          name="company_name"
          component={this.renderTextInput}
          label="Enter company name"
        />
        <Field
          name="company_logo"
          component={this.renderTextInput}
          label="Enter company logo"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.company_name) {
    errors.company_name = 'You must enter a company name';
  }

  if (!formValues.company_logo) {
    errors.company_logo = 'You must enter a company logo';
  }

  return errors;
};

export default reduxForm({
  form: 'companyForm',
  validate
})(CompanyForm);
