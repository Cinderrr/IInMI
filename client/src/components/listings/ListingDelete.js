import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchListing, deleteListing } from '../../actions';

class ListingDelete extends React.Component {
  componentDidMount() {
    this.props.fetchListing(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteListing(id)}
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
    if (!this.props.listing) {
      return 'Are you sure you want to delete this listing?';
    }

    return `Are you sure you want to delete the listing with description: ${
      this.props.listing.description
    }`;
  }

  render() {
    return (
      <Modal
        title="Delete Listing"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { listing: state.listings[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchListing, deleteListing }
)(ListingDelete);
