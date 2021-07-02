import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchCompany, deleteCompany } from '../../actions';

class CompanyDelete extends React.Component {
  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteCompany(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.companies) {
      return 'Are you sure you want to delete this company?';
    }

    return `Are you sure you want to delete the company with the name: ${
      this.props.companies.company_name
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Company"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { companies: state.companies[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchCompany, deleteCompany }
)(CompanyDelete);
