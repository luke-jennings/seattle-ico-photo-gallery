import TPhotosDisplay from '../types/TPhotosDisplay';

interface IMetaDataState {

    isInvalidRoute: boolean;

    arePhotosLoading: boolean;

    photosDisplayType: TPhotosDisplay;

    route: string;

    routeBackToGallery: string | null;
}

export default IMetaDataState;