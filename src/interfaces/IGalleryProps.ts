import { RouteComponentProps } from 'react-router-dom';
import { searchClicked, pagingClicked, filterChanged, galleryLoaded } from '../store/Actions';
import { TGalleryProps } from '../types/TGalleryProps';
import { IPhoto } from '../interfaces/IPhoto';
import { IFiltersSelectedState } from '../interfaces/IFiltersSelectedState';

export interface IGalleryProps extends RouteComponentProps<TGalleryProps> {
    galleryLoaded: typeof galleryLoaded;
    filterChanged: typeof filterChanged;
    searchClicked: typeof searchClicked;
    pagingClicked: typeof pagingClicked;
    photos: IPhoto[];
    filterOptionsSelected: IFiltersSelectedState;
    filterMessage: string;
}