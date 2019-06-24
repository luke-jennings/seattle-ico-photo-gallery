import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';

export interface IMetaDataState {
    isInvalidRoute: boolean;
    isLoading: boolean;
    photosDisplayType: PhotosDisplayType;
    route: string;
}