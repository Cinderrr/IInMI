import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCompanies } from '../../actions';

class CompanyList extends React.Component {
  componentDidMount() {
    this.props.fetchCompanies();
  }

  renderAdmin(company) {
    if (company.userId === this.props.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/companies/edit/${company.id}`} className="ui button primary">
            Edit
          </Link>
          <Link
            to={`/companies/delete/${company.id}`}
            className="ui button negative"
          >
            Delete
          </Link>
        </div>
      );
    }
  }

  renderList() {
    return this.props.companies.map(company => {
      if(company.userId === this.props.currentUserId)
      return (
        <div className="item" key={company.id}>
          {this.renderAdmin(company)}
          <i className="large middle aligned icon chevron circle right" />
          <div className="content">
            <Link to={`/companies/${company.id}`} className="header">
              {company.company_name}
            </Link>
            <div className="description">{company.company_logo}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/companies/new" className="ui button primary">
            Create Company
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Companies</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    companies: Object.values(state.companies),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchCompanies }
)(CompanyList);
