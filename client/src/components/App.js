import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import ListingCreate from './listings/ListingCreate';
import ListingEdit from './listings/ListingEdit';
import ListingDelete from './listings/ListingDelete';
import ListingShow from './listings/ListingShow';
import CompanyCreate from './company/CompanyCreate';
import CompanyEdit from './company/CompanyEdit';
import CompanyDelete from './company/CompanyDelete';
import CompanyShow from './company/CompanyShow';
import Header from './Header';
import history from '../history';


const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/listings/delete/:id" exact component={ListingDelete} />
            <Route path="/listings/:id" exact component={ListingShow} />
            <Route path="/listings/edit/:id" exact component={ListingEdit} />
            <Route path="/companies/delete/:id" exact component={CompanyDelete} />
            <Route path="/companies/new" exact component={CompanyCreate} />
            <Route path="/companies/:id/new" exact component={ListingCreate} />
            <Route path="/companies/:id" exact component={CompanyShow} />
            <Route path="/companies/edit/:id" exact component={CompanyEdit} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

/*            <Route path="/Listings/new" exact component={ListingCreate} />
            <Route path="/Listings/edit/:id" exact component={ListingEdit} />
            <Route path="/Listings/delete/:id" exact component={ListingDelete} />
            <Route path="/Listings/:id" exact component={ListingShow} />*/

export default App;
