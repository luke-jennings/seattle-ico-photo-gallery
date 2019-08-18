import { MetaDataActionTypes, FilterActionTypes, PhotosActionTypes } from './Types';
import { ReduxActionType } from '../enumerations/ReduxActionType';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IFiltersSelectedState } from '../interfaces/IFiltersSelectedState';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { ISelectOption } from '../interfaces/ISelectOption';
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';

const initialMetaDataState: IMetaDataState = {
    isInvalidRoute: false,
    arePhotosLoading: true,
    photosDisplayType: PhotosDisplayType.Thumbnails,
    route: '/'
};

const initialPhotosState: IPhotosPaginateState = {
    pageCount: 0,
    pageIndex: 0,
    photos: []
};

const initialFilterState: IFiltersSelectedState = {
    tripType: {} as ISelectOption, team: {} as ISelectOption
}

export function metaDataReducer(state = initialMetaDataState, action: MetaDataActionTypes): IMetaDataState {

    console.log("metaDataReducer state & action", state, action);

    switch (action.type) {
        case ReduxActionType.LOAD_GALLERY_FROM_ROUTE:
        {
            const { isInvalidRoute, arePhotosLoading, photosDisplayType, route } = action.payload;
            return {
                ...state,
                isInvalidRoute: isInvalidRoute,
                arePhotosLoading: arePhotosLoading,
                photosDisplayType: photosDisplayType,
                route: route
            }
        }
        case ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE:
        {
            const { isInvalidRoute, arePhotosLoading, photosDisplayType, route } = action.payload;
            return {
                ...state,
                isInvalidRoute: isInvalidRoute,
                arePhotosLoading: arePhotosLoading,
                photosDisplayType: photosDisplayType,
                route: route
            }
        }
        case ReduxActionType.CLICK_SEARCH:
        {
            const { isInvalidRoute, arePhotosLoading, photosDisplayType, route } = action.payload;
            return {
                ...state,
                isInvalidRoute: isInvalidRoute,
                arePhotosLoading: arePhotosLoading,
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
            const { pageCount, pageIndex, photos } = action.payload;
            return {
                ...state,
                pageCount: pageCount,
                pageIndex: pageIndex,
                photos: photos
            }
        }
        case ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE:
        {
            const { pageCount, pageIndex, photos } = action.payload;
            return {
                ...state,
                pageCount: pageCount,
                pageIndex: pageIndex,
                photos: photos
            }
        }
        case ReduxActionType.CLICK_SEARCH:
        {
            const { pageCount, pageIndex, photos } = action.payload;
            return {
                ...state,
                pageCount: pageCount,
                pageIndex: pageIndex,
                photos: photos
            };
        }
        case ReduxActionType.CLICK_PAGING:
        {
            const { pageIndex } = action.payload;
            return {
                ...state,
                pageIndex: pageIndex
            };
        }
        case ReduxActionType.CLICK_THUMBNAIL:
        {
            const { pageCount, pageIndex, photos } = action.payload;
            return {
                ...state,
                pageCount: pageCount,
                pageIndex: pageIndex,
                photos: photos
            };
        }
        default:
            return state;
    }
}

export function filtersReducer(state = initialFilterState, action: FilterActionTypes): IFiltersSelectedState {
    
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

        case ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE:
        {
            return {
                tripType: {} as ISelectOption,
                team: {} as ISelectOption
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