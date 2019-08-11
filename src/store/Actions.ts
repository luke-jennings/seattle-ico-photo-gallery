import { IGalleryState } from '../interfaces/IGalleryState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IFilterState } from '../interfaces/IFilterState';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { ReduxActionType } from '../enumerations/ReduxActionType';

export function galleryLoaded(galleryState: IGalleryState) {
    return {
        type: ReduxActionType.LOAD_GALLERY_FROM_ROUTE,
        payload: galleryState
    };
}

export function searchClicked(slideshowState: ISlideshowState) {
    return {
        type: ReduxActionType.CLICK_SEARCH,
        payload: slideshowState
    };
}

export function pagingClicked(slideshowState: ISlideshowState) {
    return {
        type: ReduxActionType.CLICK_PAGING,
        payload: slideshowState
    };
}

export function photoClicked(paginatedState: IPhotosPaginateState) {
    return {
        type: ReduxActionType.CLICK_THUMBNAIL,
        payload: paginatedState
    };
}

export function filterChanged(filterValues: IFilterState) {
    return {
        type: ReduxActionType.CHANGE_FILTER,
        payload: filterValues
    };
}