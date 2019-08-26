import { IPhoto } from './IPhoto';

export interface IPagesState {
    pageSize: number;
    pageCount: number;
    pageIndex: number;
    photos: IPhoto[];
}