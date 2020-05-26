import { RouteComponentProps } from 'react-router-dom';
import { searchClicked, pagingClicked, filterChanged, galleryLoaded, galleryPhotosLoaded, thumbnailClicked, invalidRoute } from '../store/Actions';
import TGalleryProps from '../types/TGalleryProps';
import IMetaDataState from './IMetaDataState';
import IFilterState from './IFilterState';
import IPagesState from './IPagesState';

interface IGalleryProps extends RouteComponentProps<TGalleryProps> {
    
    galleryLoaded: typeof galleryLoaded;
    galleryPhotosLoaded: typeof galleryPhotosLoaded;
    filterChanged: typeof filterChanged;
    searchClicked: typeof searchClicked;
    pagingClicked: typeof pagingClicked;
    thumbnailClicked: typeof thumbnailClicked;
    invalidRoute: typeof invalidRoute;

    metaData: IMetaDataState;
    filter: IFilterState;
    pages: IPagesState;
}

export default IGalleryProps;