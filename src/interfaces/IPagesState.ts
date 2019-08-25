import { IPhoto } from './IPhoto';

export interface IPagesState {
    pageCount: number;
    pageIndex: number;
    photos: IPhoto[];
}