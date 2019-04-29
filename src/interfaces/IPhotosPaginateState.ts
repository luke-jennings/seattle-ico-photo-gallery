import { IPhoto } from './IPhoto';

export interface IPhotosPaginateState {
    isLoading: boolean;
    pageCount: number;
    selectedPage: number;
    photos: IPhoto[];
    isInvalidRoute: boolean;
}