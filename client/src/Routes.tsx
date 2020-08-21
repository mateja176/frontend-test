import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { NavItems } from './Layout';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        exact
        path={'/'}
        render={() => <Redirect to={NavItems.dashboard} />}
      />
      <Route exact path={NavItems.dashboard} component={Dashboard} />
      <Route exact path={NavItems.upload} component={Upload} />
    </Switch>
  );
};

export default Routes;
