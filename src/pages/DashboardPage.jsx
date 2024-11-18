// src/pages/Dashboard.jsx
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Overview from './DashboardOverview';
import Tenants from './DashboardTenants';
import Payments from './DashboardPayments';
import Maintenance from './DashboardMaintenance';
import Reports from './DashboardReports';

const DashboardPage = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <h1>Apartment Owner Dashboard</h1>
      <Switch>
        <Route exact path={`${path}/overview`} component={Overview} />
        <Route path={`${path}/tenants`} component={Tenants} />
        <Route path={`${path}/payments`} component={Payments} />
        <Route path={`${path}/maintenance`} component={Maintenance} />
        <Route path={`${path}/reports`} component={Reports} />
      </Switch>
    </div>
  );
};

export default DashboardPage;
