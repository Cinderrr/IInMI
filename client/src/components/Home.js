import React from 'react';
import { connect } from 'react-redux';
import ListingList from './listings/ListingList';
import CompanyList from './company/CompanyList'

class Home extends React.Component {
  onSubmit = formValues => {
    this.props.createListing(formValues);
  };

  render() {
    if(this.props.isSignedIn)
    {
      return (
        <div>
          <div>
            <ListingList />
          </div>
          <div>
            <CompanyList />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <ListingList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps
  )(Home);
