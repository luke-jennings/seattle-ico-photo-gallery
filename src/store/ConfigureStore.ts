import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { metaDataReducer, filtersReducer, photosReducer } from './Reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';

import { ISelectOption } from '../interfaces/ISelectOption';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IFilterState } from "../interfaces/IFilterState";
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';

const rootReducer = combineReducers({
    metaData: metaDataReducer,
    filter: filtersReducer,
    photos: photosReducer
});
  
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

// This enables the Redux DevTools extension (available via the Chrome Web Store)
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialMetaDataState: IMetaDataState = {
    isInvalidRoute: false,
    isLoading: true,
    photosDisplayType: PhotosDisplayType.Thumbnails,
    route: '/'
};

const initialFilterState: IFilterState = {
    tripType: {} as ISelectOption, team: {} as ISelectOption
};

const initialPhotosState: IPhotosPaginateState = {
    pageCount: 0,
    selectedPage: 0,
    photos: []
};

export type AppState = ReturnType<typeof rootReducer>;
  
export default function configureStore() {

    const store = createStore(
        rootReducer,
        { metaData: initialMetaDataState, filter: initialFilterState, photos: initialPhotosState  },
        composeEnhancers()
    );

    return store;
}