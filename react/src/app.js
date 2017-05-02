import React from 'react';
import {ReactDOM, render} from 'react-dom';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

const App = (props) => {
  return(
    <Router history={browserHistory}>
      <Route path="users/:id" component={ProfileContainer} />
    </Router>
  )
}

export default App;
