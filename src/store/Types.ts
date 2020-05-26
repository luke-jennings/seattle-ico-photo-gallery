import IFilterSelectedOptionsState from '../interfaces/IFilterSelectedOptionsState';
import IGalleryState from '../interfaces/IGalleryState';
import IMetaDataState from '../interfaces/IMetaDataState';
import IReduxAction from '../interfaces/IReduxAction';
import ISlideshowState from '../interfaces/ISlideshowState';

interface ILoadGalleryFromRouteAction extends IReduxAction {
    type: 'LOAD_GALLERY_FROM_ROUTE';
    payload: IGalleryState;
}

interface ILoadGalleryPhotosAction extends IReduxAction {
    type: 'LOAD_GALLERY_PHOTOS';
    payload: IGalleryState;
}

interface ILoadSlideshowFromRouteAction extends IReduxAction {
    type: 'LOAD_SLIDESHOW_FROM_ROUTE';
    payload: ISlideshowState;
}

interface IInvalidRoute extends IReduxAction {
    type: 'INVALID_ROUTE';
    payload: IMetaDataState;
}

interface IChangeFilterAction extends IReduxAction {
    type: 'CHANGE_FILTER';
    payload: IFilterSelectedOptionsState;
}

interface IClickSearchAction extends IReduxAction {
    type: 'CLICK_SEARCH';
    payload: IGalleryState;
}

interface IClickPagingAction extends IReduxAction {
    type: 'CLICK_PAGING';
    payload: ISlideshowState;
}

interface IClickThumbnailAction extends IReduxAction {
    type: 'CLICK_THUMBNAIL';
    payload: IMetaDataState;
}

// IReduxAction is added to the action types for resons of testing so can test reducers for how they handle unexpcted types.

export type MetaDataActionTypes = IClickSearchAction | IClickPagingAction | ILoadGalleryFromRouteAction | ILoadGalleryPhotosAction | ILoadSlideshowFromRouteAction | IClickThumbnailAction | IInvalidRoute | IReduxAction;

export type FilterActionTypes = IChangeFilterAction | ILoadGalleryFromRouteAction | ILoadGalleryPhotosAction | ILoadSlideshowFromRouteAction | IClickSearchAction | IReduxAction;

export type PaginationActionTypes =  IClickPagingAction | IClickSearchAction | ILoadGalleryFromRouteAction | ILoadGalleryPhotosAction | ILoadSlideshowFromRouteAction | IReduxAction;