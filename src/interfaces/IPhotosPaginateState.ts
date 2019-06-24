import { IPhoto } from './IPhoto';

export interface IPhotosPaginateState {
    pageCount: number;
    selectedPage: number;
    photos: IPhoto[];
}