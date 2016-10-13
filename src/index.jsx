import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

import App from 'containers/app/app';
import Quiz from 'containers/quiz/quiz';
import Dashboard from 'containers/dashboard/dashboard';
import NotFound from 'containers/not-found/not-found';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute name="Quiz" component={Quiz}/>
      <Route name="Dashboard" path="dashboard" component={Dashboard}/>
      <Route name="404" path="*" component={NotFound}/>
    </Route>
  </Router>,
  document.querySelector('#root')
);
