import { ReduxActionType } from '../enumerations/ReduxActionType';
import { IFilterSelectedOptionsState } from '../interfaces/IFilterSelectedOptionsState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IGalleryState } from '../interfaces/IGalleryState';
import { IReduxAction } from '../interfaces/IReduxAction';
import { IMetaDataState } from '../interfaces/IMetaDataState';

interface LoadGalleryFromRouteAction extends IReduxAction {
    type: typeof ReduxActionType.LOAD_GALLERY_FROM_ROUTE;
    payload: IGalleryState;
}

interface LoadSlideshowFromRouteAction extends IReduxAction {
    type: typeof ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE;
    payload: ISlideshowState;
}

interface InvalidRoute extends IReduxAction {
    type: typeof ReduxActionType.INVALID_ROUTE;
    payload: IMetaDataState;
}

interface ChangeFilterAction extends IReduxAction {
    type: typeof ReduxActionType.CHANGE_FILTER;
    payload: IFilterSelectedOptionsState;
}

interface ClickSearchAction extends IReduxAction {
    type: typeof ReduxActionType.CLICK_SEARCH;
    payload: IGalleryState;
}

interface ClickPagingAction extends IReduxAction {
    type: typeof ReduxActionType.CLICK_PAGING;
    payload: ISlideshowState;
}

interface ClickThumbnailAction extends IReduxAction {
    type: typeof ReduxActionType.CLICK_THUMBNAIL;
    payload: IMetaDataState;
}

// IReduxAction is added to the action types for resons of testing so can test reducers for how they handle unexpcted types.

export type MetaDataActionTypes = ClickSearchAction | ClickPagingAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction | ClickThumbnailAction | InvalidRoute | IReduxAction;

export type FilterActionTypes = ChangeFilterAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction | ClickSearchAction | IReduxAction;

export type PaginationActionTypes =  ClickPagingAction | ClickSearchAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction | IReduxAction;