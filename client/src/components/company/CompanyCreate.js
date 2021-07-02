import React from 'react';
import { connect } from 'react-redux';
import { createCompany } from '../../actions';
import CompanyForm from './CompanyForm';

class CompanyCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createCompany(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Company</h3>
        <CompanyForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createCompany }
)(CompanyCreate);
