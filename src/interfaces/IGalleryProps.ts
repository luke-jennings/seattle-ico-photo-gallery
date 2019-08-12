import { RouteComponentProps } from 'react-router-dom';
import { searchClicked, pagingClicked, filterChanged, galleryLoaded } from '../store/Actions';
import { TGalleryProps } from '../types/TGalleryProps';

export interface IGalleryProps extends RouteComponentProps<TGalleryProps> {
    galleryLoaded: typeof galleryLoaded;
    filterChanged: typeof filterChanged;
    searchClicked: typeof searchClicked;
    pagingClicked: typeof pagingClicked;
}