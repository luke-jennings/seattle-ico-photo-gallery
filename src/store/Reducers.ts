import { MetaDataActionTypes, FilterActionTypes, PhotosActionTypes } from './Types';
import { ReduxActionType } from '../enumerations/ReduxActionType';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IFilterState } from '../interfaces/IFilterState';
import { IPagesState } from '../interfaces/IPagesState';
import { ISelectOption } from '../interfaces/ISelectOption';
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';
import { IGalleryState } from '../interfaces/IGalleryState';

const initialMetaDataState: IMetaDataState = {
    isInvalidRoute: false,
    arePhotosLoading: true,
    photosDisplayType: PhotosDisplayType.Thumbnails,
    route: '/'
};

const initialPhotosState: IPagesState = {
    pageCount: 0,
    pageIndex: 0,
    photos: []
};

const initialFilterState: IFilterState = {
    tripType: {} as ISelectOption,
    team: {} as ISelectOption,
    message: ''
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

export function photosReducer(state = initialPhotosState, action: PhotosActionTypes): IPagesState {

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

/**
 * The message to be displayed that summarizes the number of photos for the selected filter criteria.
 * 
 * @param galleryState The IGalleryState which will have the required properties of photos, tripType, and Team needed to generate the message.
 */
function getFilterMessage(galleryState: IGalleryState){

    let message: string = `${ galleryState.photos.length } photos of type ${ galleryState.tripType.text } and team ${ galleryState.team.text }.`;

    return message;
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
                team: team,
                message: getFilterMessage(action.payload)
            }
        }

        case ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE:
        {
            return initialFilterState;
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