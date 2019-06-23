import { CLICK_SEARCH, CLICK_PAGING, CLICK_PHOTO, ClickActionTypes, ClickFilterActionTypes } from './Types';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { IFilterValues } from '../interfaces/IFilterValues';
import { ISelectOption } from '../interfaces/ISelectOption';
import { stat } from 'fs';
  
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

export function photosMetaReducer(state = initialState, action: ClickActionTypes): IPhotosPaginateState {

    switch (action.type) {
        case CLICK_SEARCH:
        {
            const { pageCount, selectedPage, photos } = action.payload;
            return {
                ...state,
                isLoading: false,
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

export function filtersReducer(state = initialFilterState, action: ClickFilterActionTypes): IFilterValues {
    
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