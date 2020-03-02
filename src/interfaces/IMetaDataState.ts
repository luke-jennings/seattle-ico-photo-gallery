import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';

export interface IMetaDataState {
    isInvalidRoute: boolean;
    arePhotosLoading: boolean;
    photosDisplayType: PhotosDisplayType;
    route: string;
    routeBackToGallery: string | null;
}