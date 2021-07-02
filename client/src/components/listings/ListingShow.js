import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchListing, editListing } from '../../actions';
import ListingBidForm from './ListingBidForm';

class ListingShow extends React.Component {
  componentDidMount() {
    this.props.fetchListing(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editListing(this.props.match.params.id, formValues);
  };

  renderDetails() {
    if(!this.props.listing)
    {
      return <div>Loading details...</div>;
    }

    return(
      <div>
        <div>
          <Link to={`/companies/${this.props.listing.company_id}`}>
            Go to Company's page
          </Link>
        </div>
        <div>
          Title: {this.props.listing.description}
        </div>
        <div>
          Equity: %{this.props.listing.equity}
        </div>
        <div>
          Duration: {this.props.listing.duration} days
        </div>
        <div>
          Current Price: ${this.props.listing.current_price}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <div>
          {this.renderDetails()}
        </div>
        <div>
          <ListingBidForm onSubmit={this.onSubmit} />
        </div>
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
)(ListingShow);
