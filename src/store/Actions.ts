import { IGalleryState } from '../interfaces/IGalleryState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IFiltersSelectedState } from '../interfaces/IFiltersSelectedState';
import { IPagesState } from '../interfaces/IPagesState';
import { ReduxActionType } from '../enumerations/ReduxActionType';

export function galleryLoaded(galleryState: IGalleryState) {
    return {
        type: ReduxActionType.LOAD_GALLERY_FROM_ROUTE,
        payload: galleryState
    };
}

export function filterChanged(filterValues: IFiltersSelectedState) {
    return {
        type: ReduxActionType.CHANGE_FILTER,
        payload: filterValues
    };
}

export function searchClicked(galleryState: IGalleryState) {
    return {
        type: ReduxActionType.CLICK_SEARCH,
        payload: galleryState
    };
}

export function pagingClicked(slideshowState: ISlideshowState) {
    return {
        type: ReduxActionType.CLICK_PAGING,
        payload: slideshowState
    };
}

export function photoClicked(paginatedState: IPagesState) {
    return {
        type: ReduxActionType.CLICK_THUMBNAIL,
        payload: paginatedState
    };
}

export function slideshowLoaded(slideshowState: ISlideshowState){
    return {
        type: ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE,
        payload: slideshowState
    }
}