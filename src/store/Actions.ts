import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { IFilterValues } from '../interfaces/IFilterValues';
import { CLICK_SEARCH, CLICK_PAGING, CLICK_PHOTO } from './Types';

export function searchClicked(paginatedState: IPhotosPaginateState) {
    return {
        type: CLICK_SEARCH,
        payload: paginatedState
      };
}

export function pagingClicked(paginatedState: IPhotosPaginateState) {
    return {
        type: CLICK_PAGING,
        payload: paginatedState
    }
}

export function photoClicked(paginatedState: IPhotosPaginateState) {
    return {
        type: CLICK_PHOTO,
        payload: paginatedState
    }
}

export function filterClicked(filterValues: IFilterValues) {
    return {
        type: CLICK_SEARCH,
        payload: filterValues
    }
}