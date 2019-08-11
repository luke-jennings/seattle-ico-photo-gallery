import { IGalleryState } from '../interfaces/IGalleryState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IFilterState } from '../interfaces/IFilterState';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { LOAD_GALLERY_FROM_ROUTE, CHANGE_FILTER, CLICK_SEARCH, CLICK_PAGING, CLICK_THUMBNAIL } from './Types';

export function galleryLoaded(galleryState: IGalleryState) {
    return {
        type: LOAD_GALLERY_FROM_ROUTE,
        payload: galleryState
    };
}

export function searchClicked(slideshowState: ISlideshowState) {
    return {
        type: CLICK_SEARCH,
        payload: slideshowState
    };
}

export function pagingClicked(slideshowState: ISlideshowState) {
    return {
        type: CLICK_PAGING,
        payload: slideshowState
    };
}

export function photoClicked(paginatedState: IPhotosPaginateState) {
    return {
        type: CLICK_THUMBNAIL,
        payload: paginatedState
    };
}

export function filterChanged(filterValues: IFilterState) {
    return {
        type: CHANGE_FILTER,
        payload: filterValues
    };
}