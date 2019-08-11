import { MetaDataActionTypes, FilterActionTypes, PhotosActionTypes } from './Types';
import { ReduxActionType } from '../enumerations/ReduxActionType';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IFilterState } from '../interfaces/IFilterState';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { ISelectOption } from '../interfaces/ISelectOption';
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';

const initialMetaDataState: IMetaDataState = {
    isInvalidRoute: false,
    isLoading: true,
    photosDisplayType: PhotosDisplayType.Thumbnails,
    route: '/'
};

const initialPhotosState: IPhotosPaginateState = {
    pageCount: 0,
    selectedPage: 0,
    photos: []
};

const initialFilterState: IFilterState = {
    tripType: {} as ISelectOption, team: {} as ISelectOption
}

export function metaDataReducer(state = initialMetaDataState, action: MetaDataActionTypes): IMetaDataState {

    console.log("metaDataReducer state & action", state, action);

    switch (action.type) {
        case ReduxActionType.LOAD_GALLERY_FROM_ROUTE:
        {
            const { isInvalidRoute, isLoading, photosDisplayType, route } = action.payload;
            return {
                ...state,
                isInvalidRoute: isInvalidRoute,
                isLoading: isLoading,
                photosDisplayType: photosDisplayType,
                route: route
            }
        }
        case ReduxActionType.CLICK_SEARCH:
        {
            const { isInvalidRoute, isLoading, photosDisplayType, route } = action.payload;
            return {
                ...state,
                isInvalidRoute: isInvalidRoute,
                isLoading: isLoading,
                photosDisplayType: photosDisplayType,
                route: route
            };
        }
        case ReduxActionType.CLICK_PAGING:
        {
            const { route } = action.payload;
            return {
                ...state,
                route: route
            };
        }
        default:
            return state;
    }
}

export function photosReducer(state = initialPhotosState, action: PhotosActionTypes): IPhotosPaginateState {

    console.log("photosReducer state & action", state, action);

    switch (action.type) {
        case ReduxActionType.LOAD_GALLERY_FROM_ROUTE:
        {
            const { pageCount, selectedPage, photos } = action.payload;
            return {
                ...state,
                pageCount: pageCount,
                selectedPage: selectedPage,
                photos: photos
            }
        }
        case ReduxActionType.CLICK_SEARCH:
        {
            const { pageCount, selectedPage, photos } = action.payload;
            return {
                ...state,
                pageCount: pageCount,
                selectedPage: selectedPage,
                photos: photos
            };
        }
        case ReduxActionType.CLICK_PAGING:
        {
            const { selectedPage } = action.payload;
            return {
                ...state,
                selectedPage: selectedPage
            };
        }
        case ReduxActionType.CLICK_THUMBNAIL:
        {
            const { pageCount, selectedPage, photos } = action.payload;
            return {
                ...state,
                pageCount: pageCount,
                selectedPage: selectedPage,
                photos: photos
            };
        }
        default:
            return state;
    }
}

export function filtersReducer(state = initialFilterState, action: FilterActionTypes): IFilterState {
    
    console.log("filtersReducer state & action", state, action);
    
    switch (action.type) {

        case ReduxActionType.LOAD_GALLERY_FROM_ROUTE:
        {
            const { tripType, team } = action.payload;
            return {
                ...state,
                tripType: tripType,
                team: team
            }
        }

        case ReduxActionType.CHANGE_FILTER:
        {
            const { tripType, team } = action.payload;
            return {
                ...state,
                tripType: tripType,
                team: team
            };
        }

        default:
            return state;
    }
}