import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState';
import { IFilterState } from '../interfaces/IFilterState';

export const CLICK_SEARCH = "CLICK_SEARCH"; // The user clicked the filter search button

export const CLICK_PAGING = "CLICK_PAGING"; // The user clicked a paging number of arrow

export const CLICK_PHOTO = "CLICK_PHOTO"; // The user clicked a photo thumbnail

interface ClickSearchAction {
    type: typeof CLICK_SEARCH;
    payload: IPhotosPaginateState;
}

interface ClickPagingAction {
    type: typeof CLICK_PAGING;
    payload: IPhotosPaginateState;
}

interface ClickPhotoAction {
    type: typeof CLICK_PHOTO;
    payload: IPhotosPaginateState;
}

interface ClickSearchFilterAction {
    type: typeof CLICK_SEARCH;
    payload: IFilterState;
}

interface ClickSearchMetaDataAction {
    type: typeof CLICK_SEARCH;
    payload: IMetaDataState;
}

interface ClickPagingMetaDataAction {
    type: typeof CLICK_PAGING;
    payload: IMetaDataState;
}

export type ClickActionTypes = ClickSearchAction | ClickPagingAction | ClickPhotoAction;

export type ClickFilterActionTypes = ClickSearchFilterAction;

export type ClickMetaDataActionTypes = ClickSearchMetaDataAction | ClickPagingMetaDataAction;