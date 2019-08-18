import { ReduxActionType } from '../enumerations/ReduxActionType';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { IFiltersSelectedState } from '../interfaces/IFiltersSelectedState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IGalleryState } from '../interfaces/IGalleryState';
import { IReduxAction } from '../interfaces/IReduxAction';

interface LoadGalleryFromRouteAction extends IReduxAction {
    type: typeof ReduxActionType.LOAD_GALLERY_FROM_ROUTE;
    payload: IGalleryState;
}

interface LoadSlideshowFromRouteAction extends IReduxAction {
    type: typeof ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE;
    payload: ISlideshowState;
}

interface ChangeFilterAction extends IReduxAction {
    type: typeof ReduxActionType.CHANGE_FILTER;
    payload: IFiltersSelectedState;
}

interface ClickSearchAction extends IReduxAction {
    type: typeof ReduxActionType.CLICK_SEARCH;
    payload: ISlideshowState;
}

interface ClickPagingAction extends IReduxAction {
    type: typeof ReduxActionType.CLICK_PAGING;
    payload: ISlideshowState;
}

interface ClickPhotoAction extends IReduxAction {
    type: typeof ReduxActionType.CLICK_THUMBNAIL;
    payload: IPhotosPaginateState;
}

export type MetaDataActionTypes = ClickSearchAction | ClickPagingAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction;

export type FilterActionTypes = ChangeFilterAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction;

export type PhotosActionTypes = ClickPhotoAction | ClickPagingAction | ClickSearchAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction;