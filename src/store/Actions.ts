import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IFilterState } from '../interfaces/IFilterState';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
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

export function filterClicked(filterValues: IFilterState) {
    return {
        type: CLICK_SEARCH,
        payload: filterValues
    }
}

export function filterClickedUpdateMetaData(metaDataValues: IMetaDataState) {
    return {
        type: CLICK_SEARCH,
        payload: metaDataValues
    }
}

export function pagingClickedUpdateMetaData(metaDataValues: IMetaDataState) {
    return {
        type: CLICK_PAGING,
        payload: metaDataValues
    }
}