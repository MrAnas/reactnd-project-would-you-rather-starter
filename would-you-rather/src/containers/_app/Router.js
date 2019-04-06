import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../login';
import AddQuestion from '../question/add';

const Pages = () => (
  <Switch>
    <Route path="/login" component={Login} />
    
  </Switch>
);

const wrappedRoutes = () => (
  <div>

    <div className="container">
      <Route path="/pages" component={Pages} />
      <Route path="/questions/add" component={AddQuestion} />
    </div>
  </div>
);

const Router = () => (
    <main>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route path="/questions/add" component={AddQuestion} />

        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
);

export default Router;
