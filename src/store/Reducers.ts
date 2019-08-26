import { MetaDataActionTypes, FilterActionTypes, PhotosActionTypes } from './Types';
import { ReduxActionType } from '../enumerations/ReduxActionType';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IFilterState } from '../interfaces/IFilterState';
import { IPagesState } from '../interfaces/IPagesState';
import { IGalleryState } from '../interfaces/IGalleryState';
import { InitialState } from '../helpers/InitialState';

export function metaDataReducer(state = InitialState.MetaData(), action: MetaDataActionTypes): IMetaDataState {

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

export function pagesReducer(state = InitialState.Pages(), action: PhotosActionTypes): IPagesState {

    console.log("pagesReducer state & action", state, action);

    switch (action.type) {
        case ReduxActionType.LOAD_GALLERY_FROM_ROUTE:
        {
            const { pageSize, pageCount, pageIndex, photos } = action.payload;
            return {
                ...state,
                pageSize: pageSize,
                pageCount: pageCount,
                pageIndex: pageIndex,
                photos: photos
            }
        }
        case ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE:
        {
            const { pageSize, pageCount, pageIndex, photos } = action.payload;
            return {
                ...state,
                pageSize: pageSize,
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

/**
 * The message to be displayed that summarizes the number of photos for the selected filter criteria.
 * 
 * @param galleryState The IGalleryState which will have the required properties of photos, tripType, and Team needed to generate the message.
 */
function getFilterMessage(galleryState: IGalleryState){

    let message: string = `${ galleryState.photos.length } photos of type ${ galleryState.tripType.text } and team ${ galleryState.team.text }.`;

    return message;
}

export function filtersReducer(state = InitialState.Filters(), action: FilterActionTypes): IFilterState {
    
    console.log("filtersReducer state & action", state, action);
    
    switch (action.type) {

        case ReduxActionType.LOAD_GALLERY_FROM_ROUTE:
        {
            const { filterOptions, tripType, team } = action.payload;
            return {
                ...state,
                filterOptions: filterOptions,
                tripType: tripType,
                team: team,
                message: getFilterMessage(action.payload)
            }
        }

        case ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE:
        {
            return InitialState.Filters();
        }

        case ReduxActionType.CLICK_SEARCH:
        {
            
            return {
                ...state,
                message: getFilterMessage(action.payload)
            };
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