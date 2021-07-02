import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCompany, editCompany } from '../../actions';
import CompanyForm from './CompanyForm';

class CompanyEdit extends React.Component {
  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editCompany(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.companies) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Company</h3>
        <CompanyForm
          initialValues={_.pick(this.props.companies, 'company_name', 'company_logo')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { companies: state.companies[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchCompany, editCompany }
)(CompanyEdit);
