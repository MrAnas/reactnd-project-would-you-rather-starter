import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../login';
import Question from '../question';
import AddQuestion from '../question/add';
import Leaderboard from '../leaderboard';
import Home from '../home';

const Pages = () => (
  <Switch>
    <Route path="/login" component={Login} />
    
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <div className="container">
      <Route path="/pages" component={Pages} />
      <Route path="/question" component={Question} />
      <Route path="/questions/add" component={AddQuestion} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/home" component={Home} />
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
