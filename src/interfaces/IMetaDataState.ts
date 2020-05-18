import TPhotosDisplayType from '../types/TPhotosDisplayType';

export interface IMetaDataState {
    isInvalidRoute: boolean;
    arePhotosLoading: boolean;
    photosDisplayType: TPhotosDisplayType;
    route: string;
    routeBackToGallery: string | null;
}