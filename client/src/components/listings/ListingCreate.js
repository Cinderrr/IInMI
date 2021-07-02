import React from 'react';
import { connect } from 'react-redux';
import { createListing } from '../../actions';
import ListingForm from './ListingForm';

class ListingCreate extends React.Component {
  onSubmit = formValues => {
    formValues.company_id = this.props.match.params.id;
    this.props.createListing(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Listing</h3>
        <ListingForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { createListing }
)(ListingCreate);
