import { ReduxActionType } from '../enumerations/ReduxActionType';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { IFilterState } from '../interfaces/IFilterState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IGalleryState } from '../interfaces/IGalleryState';

interface LoadFromRouteGalleryAction {
    type: typeof ReduxActionType.LOAD_GALLERY_FROM_ROUTE;
    payload: IGalleryState;
}

interface ChangeFilterAction {
    type: typeof ReduxActionType.CHANGE_FILTER;
    payload: IFilterState;
}

interface ClickSearchAction {
    type: typeof ReduxActionType.CLICK_SEARCH;
    payload: ISlideshowState;
}

interface ClickPagingAction {
    type: typeof ReduxActionType.CLICK_PAGING;
    payload: ISlideshowState;
}

interface ClickPhotoAction {
    type: typeof ReduxActionType.CLICK_THUMBNAIL;
    payload: IPhotosPaginateState;
}

export type MetaDataActionTypes = ClickSearchAction | ClickPagingAction | LoadFromRouteGalleryAction;

export type FilterActionTypes = ChangeFilterAction | LoadFromRouteGalleryAction;

export type PhotosActionTypes = ClickPhotoAction | ClickPagingAction | ClickSearchAction | LoadFromRouteGalleryAction;