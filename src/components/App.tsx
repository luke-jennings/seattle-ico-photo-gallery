import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import Gallery from './Gallery';
import NotFound from './NotFound';

import '../styles/App.css';

const history = createBrowserHistory();

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div className="App container mb-2">
          <Switch>
            <Route path="/" exact component={Gallery} />
            <Route path="/:tripTypeName/:teamName/:pageNumber?" component={Gallery} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
