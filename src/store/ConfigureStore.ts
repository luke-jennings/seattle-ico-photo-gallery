import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { photosMetaReducer, filtersReducer } from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';

import { ISelectOption } from '../interfaces/ISelectOption';
import { IGalleryState } from '../interfaces/IGalleryState';
import { IFilterValues } from "../interfaces/IFilterValues";

const rootReducer = combineReducers({
    gallery: photosMetaReducer,
    filter: filtersReducer
});
  
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// This enables the Redux DevTools extension (available via the Chrome Web Store)
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState: IPhotosPaginateState = {
        isLoading: true,
        isInvalidRoute: false,
        pageCount: 0,
        selectedPage: 0,
        photos: []
    };

const initialFilterState: IFilterValues = {
    tripType: {} as ISelectOption, team: {} as ISelectOption
}

export type AppState = ReturnType<typeof rootReducer>;
  
export default function configureStore() {

    const store = createStore(
        rootReducer,
        { gallery: initialState, filter: initialFilterState },
        composeEnhancers()
    );

    return store;
}