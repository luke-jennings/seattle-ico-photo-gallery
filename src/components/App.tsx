import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from '../store/ConfigureStore';

import Gallery from './Gallery';
import Slideshow from './Slideshow';
import NotFound from './NotFound';

import '../styles/App.css';

const store = configureStore();

const history = createBrowserHistory();

/**
 * NOTE: The re-route from the root route to kayaking/south-shore is to speed initial page loading by starting with a smaller set of photos.
 */
const App = (): JSX.Element => {

  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="App container mb-2">
          <p className="text-uppercase">Beta release of Seattle ICO&apos;s photos page as a React + Typescript + Redux + Hooks + Jest web app.</p>
          <Switch>
            <Route path={process.env.REACT_APP_GALLERY_ROOT_PATH} exact component={Gallery} />
            <Route path={`${process.env.REACT_APP_GALLERY_ROOT_PATH}:tripTypeName/:teamName/:pageNumber?`} component={Gallery} />
            <Route path={`${process.env.REACT_APP_SLIDESHOW_ROOT_PATH}:photoId/:tripReportDescription/:pageNumber?`} component={Slideshow} />
            <Redirect from="/" to={`${process.env.REACT_APP_GALLERY_ROOT_PATH}kayaking/south-shore/1` || ''} exact />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
