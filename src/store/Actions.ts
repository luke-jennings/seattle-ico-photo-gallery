import { IGalleryState } from '../interfaces/IGalleryState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IFilterSelectedOptionsState } from '../interfaces/IFilterSelectedOptionsState';
import { IReduxAction } from '../interfaces/IReduxAction';
import { IMetaDataState } from '../interfaces/IMetaDataState';

export function galleryLoaded(galleryState: IGalleryState): IReduxAction {
    return {
        type: 'LOAD_GALLERY_FROM_ROUTE',
        payload: galleryState
    };
}

export function galleryPhotosLoaded(galleryState: IGalleryState): IReduxAction {
    return {
        type: 'LOAD_GALLERY_PHOTOS',
        payload: galleryState
    };
}

export function filterChanged(filterValues: IFilterSelectedOptionsState): IReduxAction {
    return {
        type: 'CHANGE_FILTER',
        payload: filterValues
    };
}

export function searchClicked(galleryState: IGalleryState): IReduxAction {
    return {
        type: 'CLICK_SEARCH',
        payload: galleryState
    };
}

export function pagingClicked(slideshowState: ISlideshowState): IReduxAction {
    return {
        type: 'CLICK_PAGING',
        payload: slideshowState
    };
}

export function thumbnailClicked(metaDataState: IMetaDataState): IReduxAction {
    return {
        type: 'CLICK_THUMBNAIL',
        payload: metaDataState
    };
}

export function slideshowLoaded(slideshowState: ISlideshowState): IReduxAction {
    return {
        type: 'LOAD_SLIDESHOW_FROM_ROUTE',
        payload: slideshowState
    };
}

export function invalidRoute(metaDataState: IMetaDataState): IReduxAction {
    return {
        type: 'INVALID_ROUTE',
        payload: metaDataState
    };
}