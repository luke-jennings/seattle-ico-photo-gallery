import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { IFilterState } from '../interfaces/IFilterState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IGalleryState } from '../interfaces/IGalleryState';

export const LOAD_GALLERY_FROM_ROUTE = "LOAD_GALLERY_FROM_ROUTE";

export const CHANGE_FILTER = "CHANGE_FILTER"; // The user changed their selection in one of the filter drop-downs

export const CLICK_SEARCH = "CLICK_SEARCH"; // The user clicked the filter search button

export const CLICK_PAGING = "CLICK_PAGING"; // The user clicked a paging number or arrow

export const CLICK_THUMBNAIL = "CLICK_THUMBNAIL"; // The user clicked a photo thumbnail

interface LoadFromRouteGalleryAction {
    type: typeof LOAD_GALLERY_FROM_ROUTE;
    payload: IGalleryState;
}

interface ChangeFilterAction {
    type: typeof CHANGE_FILTER;
    payload: IFilterState;
}

interface ClickSearchAction {
    type: typeof CLICK_SEARCH;
    payload: ISlideshowState;
}

interface ClickPagingAction {
    type: typeof CLICK_PAGING;
    payload: ISlideshowState;
}

interface ClickPhotoAction {
    type: typeof CLICK_THUMBNAIL;
    payload: IPhotosPaginateState;
}

export type MetaDataActionTypes = ClickSearchAction | ClickPagingAction | LoadFromRouteGalleryAction;

export type FilterActionTypes = ChangeFilterAction | LoadFromRouteGalleryAction;

export type PhotosActionTypes = ClickPhotoAction | ClickPagingAction | ClickSearchAction | LoadFromRouteGalleryAction;