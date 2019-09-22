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

export type MetaDataActionTypes = ClickSearchAction | ClickPagingAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction | ClickThumbnailAction;

export type FilterActionTypes = ChangeFilterAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction | ClickSearchAction;

export type PhotosActionTypes =  ClickPagingAction | ClickSearchAction | LoadGalleryFromRouteAction | LoadSlideshowFromRouteAction;