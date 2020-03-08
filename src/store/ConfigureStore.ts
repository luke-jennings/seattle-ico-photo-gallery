import { createStore, combineReducers, compose } from 'redux';
import { metaDataReducer, filtersReducer, pagesReducer } from './Reducers';
import { InitialState } from '../helpers/InitialState';

const rootReducer = combineReducers({
    metaData: metaDataReducer,
    filter: filtersReducer,
    pages: pagesReducer
});
  
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// This enables the Redux DevTools extension (available via the Chrome Web Store)
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>;
  
export default function configureStore() {

    const store = createStore(
        rootReducer,
        { metaData: InitialState.MetaData(), filter: InitialState.Filters(), pages: InitialState.Pages()  },
        composeEnhancers()
    );

    return store;
}