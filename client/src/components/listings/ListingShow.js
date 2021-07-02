import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchListing, editListing } from '../../actions';
import ListingBidForm from './ListingBidForm';

class ListingShow extends React.Component {
  componentDidMount() {
    this.props.fetchListing(this.props.match.params.id);
  }

  renderError() {
    return (
      <div className="ui error message">
        <div className="header">Value must be higher than previous bid</div>
      </div>
    );
  }

  onSubmit = formValues => {
    if(parseInt(formValues.current_price) > parseInt(this.props.listing.current_price))
    {
      this.props.editListing(this.props.match.params.id, formValues);
    }
    else
    {
      this.renderError()
    }

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

  renderBid() {
    if(!this.props.listing)
    {
      return <div>Loading bid...</div> 
    }
    return (
      <ListingBidForm price={this.props.listing.current_price} onSubmit={this.onSubmit} />
    )
  }

  render() {
      return (
        <div>
          <div>
            {this.renderDetails()}
          </div>
          <div>
            {this.renderBid()}
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
