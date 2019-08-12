import { IPhoto } from './IPhoto';

export interface IPhotosPaginateState {
    pageCount: number;
    pageIndex: number;
    photos: IPhoto[];
}