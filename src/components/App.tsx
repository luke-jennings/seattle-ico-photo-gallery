import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history';

import Gallery from './Gallery';
import Slideshow from './Slideshow';
import NotFound from './NotFound';

import '../styles/App.css';

const history = createBrowserHistory();

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div className="App container mb-2">
          <p className="text-uppercase">Prototype of Seattle ICO's photos page as a React + Typescript web app.</p>
          <Switch>
            <Route path="/what-we-do/photos/" exact component={Gallery} />
            <Route path="/what-we-do/photos/:tripTypeName/:teamName/:pageNumber?" component={Gallery} />
            <Route path="/what-we-do/photo/:photoId/:tripReportDescription/:pageNumber?" component={Slideshow} />
            <Redirect from="/" to="/what-we-do/photos/" exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
