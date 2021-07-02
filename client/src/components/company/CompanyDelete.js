import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchCompany, deleteCompany, fetchListings, deleteListing } from '../../actions';

class CompanyDelete extends React.Component {
  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
    this.props.fetchListings();
  }

  deleteAssociatedListings(company_id) {
    this.props.listings.map(listing => {
      if(listing.company_id === company_id)
      {
        this.props.deleteListing(listing.id)
      }
    })
    this.props.deleteCompany(company_id)
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.deleteAssociatedListings(id)}
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
  return { companies: state.companies[ownProps.match.params.id],
           listings: Object.values(state.listings)
         };
};

export default connect(
  mapStateToProps,
  { fetchCompany, deleteCompany, fetchListings, deleteListing }
)(CompanyDelete);
