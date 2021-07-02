import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCompany, fetchListings } from '../../actions';

class CompanyShow extends React.Component {
  componentDidMount() {
    this.props.fetchCompany(this.props.match.params.id);
    this.props.fetchListings();
  }

  renderCreate() {
    if (this.props.companies.userId === this.props.currentUserId) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to={`/companies/${this.props.match.params.id}/new`} className="ui button primary">
            Create Listing
          </Link>
        </div>
      );
    }
  }

  renderAdmin(listing) {
    if (listing.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/listings/edit/${listing.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/listings/delete/${listing.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.listings.map(listing => {
      if(listing.company_id === this.props.match.params.id)
      return (
        <div className="item" key={listing.id}>
          {this.renderAdmin(listing)}
          <i className="large middle aligned icon chevron circle right" />
          <div className="content">
            <Link to={`/listings/${listing.id}`} className="header">
              {listing.description}
            </Link>
            <div className="description">{listing.tag}</div>
          </div>
        </div>
      );
    });
  }


  render() {
    if (!this.props.companies) {
      return <div>Loading...</div>;
    }

    const { company_name, company_logo  } = this.props.companies;

    
    return (
      <div>
        <div>
          <h1>{company_name}</h1>
        </div>
        <div>
          <h5>{company_logo}</h5>
        </div>
        <div className="ui celled list">
          <h4>Owned Listings</h4>
          {this.renderList()}
        </div>
        <div>
          {this.renderCreate(this.props.listings)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    companies: state.companies[ownProps.match.params.id],
    listings: Object.values(state.listings),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchCompany, fetchListings }
)(CompanyShow);
