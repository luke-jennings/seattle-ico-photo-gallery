import { MetaDataActionTypes, FilterActionTypes, PaginationActionTypes } from './Types';
import { GalleryHelpers } from '../helpers/GalleryHelpers';
import { InitialState } from '../helpers/InitialState';
import IFilterState from '../interfaces/IFilterState';
import IMetaDataState from '../interfaces/IMetaDataState';
import IPagesState from '../interfaces/IPagesState';

export function metaDataReducer(state = InitialState.MetaData(), action: MetaDataActionTypes): IMetaDataState {

    // Commented out to reduce number of messages being written to the console during tests.  Uncomment during development to see Reducers being called.
    //console.log("metaDataReducer state & action", state, action);
    
    switch (action.type) {

        case 'LOAD_GALLERY_FROM_ROUTE':
        {
            const { isInvalidRoute, arePhotosLoading, photosDisplayType, route } = action.payload;
            return {
                ...state,
                isInvalidRoute: isInvalidRoute,
                arePhotosLoading: arePhotosLoading,
                photosDisplayType: photosDisplayType,
                route: route,
                routeBackToGallery: null
            };
        }

        case 'LOAD_GALLERY_PHOTOS':
        {
            const { arePhotosLoading } = action.payload;

            return {
                ...state,
                arePhotosLoading: arePhotosLoading
            };
        }

        case 'LOAD_SLIDESHOW_FROM_ROUTE':
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

        case 'CLICK_SEARCH':
        {
            const { arePhotosLoading, route } = action.payload;
            return {
                ...state,
                arePhotosLoading: arePhotosLoading,
                route: route
            };
        }

        case 'CLICK_PAGING':
        {
            const { route } = action.payload;
            return {
                ...state,
                route: route
            };
        }

        case 'CLICK_THUMBNAIL':
        {
            const { arePhotosLoading, photosDisplayType, route, routeBackToGallery } = action.payload;
            return {
                ...state,
                arePhotosLoading: arePhotosLoading,
                photosDisplayType: photosDisplayType,
                route: route,
                routeBackToGallery: routeBackToGallery
            };
        }

        case 'INVALID_ROUTE':
        {
            const { isInvalidRoute, arePhotosLoading, route, photosDisplayType } = action.payload;
            return {
                ...state,
                isInvalidRoute: isInvalidRoute,
                arePhotosLoading: arePhotosLoading,
                route: route,
                photosDisplayType: photosDisplayType
            };
        }

        default:
            return state;
    }
}

export function pagesReducer(state = InitialState.Pages(), action: PaginationActionTypes): IPagesState {

    // Commented out to reduce number of messages being written to the console during tests.  Uncomment during development to see Reducers being called.
    //console.log("pagesReducer state & action", state, action);

    switch (action.type) {

        case 'LOAD_GALLERY_FROM_ROUTE':
        {
            const { pageSize, pageIndex } = action.payload;

            return {
                ...state,
                pageSize: pageSize,
                pageIndex: pageIndex
            };
        }

        case 'LOAD_GALLERY_PHOTOS':
        {
            const { pageCount, pageIndex, photos } = action.payload;

            return {
                ...state,
                pageCount: pageCount,
                pageIndex: pageIndex,
                photos: photos
            };
        }

        case 'LOAD_SLIDESHOW_FROM_ROUTE':
        {
            const { pageSize, pageCount, pageIndex, photos } = action.payload;
            return {
                ...state,
                pageSize: pageSize,
                pageCount: pageCount,
                pageIndex: pageIndex,
                photos: photos
            };
        }

        case 'CLICK_PAGING':
        {
            const { pageIndex } = action.payload;
            return {
                ...state,
                pageIndex: pageIndex
            };
        }

        default:
            return state;
    }
}

export function filtersReducer(state = InitialState.Filters(), action: FilterActionTypes): IFilterState {
    
    // Commented out to reduce number of messages being written to the console during tests.  Uncomment during development to see Reducers being called.
    //console.log("filtersReducer state & action", state, action);
    
    switch (action.type) {

        case 'LOAD_GALLERY_FROM_ROUTE':
        {
            const { filterOptions, tripType, team } = action.payload;
            return {
                ...state,
                filterOptions: filterOptions,
                tripType: tripType,
                team: team
            };
        }

        case 'LOAD_GALLERY_PHOTOS':
        {
            return {
                ...state,
                message: GalleryHelpers.GetFilterMessage(action.payload)
            };
        }

        case 'LOAD_SLIDESHOW_FROM_ROUTE':
        {
            const { tripType, team, message } = InitialState.Filters();

            return {
                ...state,
                tripType: tripType,
                team: team,
                message: message
            };
        }

        case 'CLICK_SEARCH':
        {
            return {
                ...state,
                message: GalleryHelpers.GetFilterMessage(action.payload)
            };
        }

        case 'CHANGE_FILTER':
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