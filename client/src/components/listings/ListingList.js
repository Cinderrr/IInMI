import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchListings } from '../../actions';

class ListingList extends React.Component {
  componentDidMount() {
    this.props.fetchListings();
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
    return (
      <div>
        <h2>Listings</h2>
        <div className="ui celled list">
          {this.renderList()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listings: Object.values(state.listings),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchListings }
)(ListingList);
