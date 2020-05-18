import TPhotosDisplay from '../types/TPhotosDisplay';

export interface IMetaDataState {
    isInvalidRoute: boolean;
    arePhotosLoading: boolean;
    photosDisplayType: TPhotosDisplay;
    route: string;
    routeBackToGallery: string | null;
}