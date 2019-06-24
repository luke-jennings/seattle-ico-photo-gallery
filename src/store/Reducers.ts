import { CLICK_SEARCH, CLICK_PAGING, CLICK_PHOTO, ClickActionTypes, ClickFilterActionTypes, ClickMetaDataActionTypes } from './Types';
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

export function metaDataReducer(state = initialMetaDataState, action: ClickMetaDataActionTypes): IMetaDataState {

    switch (action.type) {
        case CLICK_SEARCH:
        {
            const { route } = action.payload;
            return {
                ...state,
                route: route
            };
        }
        case CLICK_PAGING:
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

export function photosReducer(state = initialPhotosState, action: ClickActionTypes): IPhotosPaginateState {

    switch (action.type) {
        case CLICK_SEARCH:
        {
            const { pageCount, selectedPage, photos } = action.payload;
            return {
                ...state,
                pageCount: pageCount,
                selectedPage: selectedPage,
                photos: photos
            };
        }
        case CLICK_PAGING:
        {
            const { selectedPage } = action.payload;
            return {
                ...state,
                selectedPage: selectedPage
            };
        }
        case CLICK_PHOTO:
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

export function filtersReducer(state = initialFilterState, action: ClickFilterActionTypes): IFilterState {
    
    switch (action.type) {

        case CLICK_SEARCH:
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