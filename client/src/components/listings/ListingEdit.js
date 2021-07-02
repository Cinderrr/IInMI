import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { fetchListing, editListing } from '../../actions';
import ListingForm from './ListingForm';

class ListingEdit extends React.Component {
  componentDidMount() {
    this.props.fetchListing(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editListing(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.listing) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Listing</h3>
        <ListingForm
          initialValues={_.pick(this.props.listing, 'description', 'tag')}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { listing: state.listings[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchListing, editListing }
)(ListingEdit);
