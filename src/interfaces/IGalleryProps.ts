import { RouteComponentProps } from 'react-router-dom';
import { searchClicked, pagingClicked, filterChanged, galleryLoaded } from '../store/Actions';
import { TGalleryProps } from '../types/TGalleryProps';
import { IMetaDataState } from './IMetaDataState';
import { IFilterState } from './IFilterState';
import { IPagesState } from './IPagesState';

export interface IGalleryProps extends RouteComponentProps<TGalleryProps> {
    
    galleryLoaded: typeof galleryLoaded;
    filterChanged: typeof filterChanged;
    searchClicked: typeof searchClicked;
    pagingClicked: typeof pagingClicked;

    metaData: IMetaDataState;
    filter: IFilterState;
    pages: IPagesState;
}