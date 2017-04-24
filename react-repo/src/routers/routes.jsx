import React from "react";
import { Router, Route, DefaultRoute, RouteHandler, Redirect } from "react-router";

import BaseLayout from "../components/layouts/Base";
import DashboardLayout from "../components/layouts/Dashboard";

import GitUserListPage from "../components/pages/dashboard/GitUserList";
import GitUserDetailsPage from "../components/pages/dashboard/GitUserDetails";


var Routes = React.createClass({

  statics: {
    getRoutes: function() {
      return (
          <Route name="base" path="/" handler={BaseLayout}>
            <Route name="dashboard" path="/dashboard" handler={DashboardLayout}>
              <Route name="dashboard.home" path="/home" handler={GitUserListPage} />
              <Route name="dashboard.git-user-list" path="/git-user-list" handler={GitUserListPage} />
              <Route name="dashboard.git-user-details" path="/git-user-details" handler={GitUserDetailsPage} />
            </Route>
            <DefaultRoute name="default" handler={DashboardLayout} />
            <Redirect from="/" to="dashboard.home" />
          </Route>
      );
    }
  },
  render: function() {
  
  }
  
});

export default Routes;