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
            <Route path={process.env.REACT_APP_GALLERY_ROOT_PATH} exact component={Gallery} />
            <Route path={process.env.REACT_APP_GALLERY_ROOT_PATH + ":tripTypeName/:teamName/:pageNumber?"} component={Gallery} />
            <Route path={process.env.REACT_APP_SLIDESHOW_ROOT_PATH + ":photoId/:tripReportDescription/:pageNumber?"} component={Slideshow} />
            <Redirect from="/" to={process.env.REACT_APP_GALLERY_ROOT_PATH || ""} exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
