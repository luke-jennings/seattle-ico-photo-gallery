import { RouteComponentProps } from 'react-router-dom';
import { searchClicked, pagingClicked, filterChanged, galleryLoaded } from '../store/Actions';

type TGalleryProps = {
    tripTypeName?: string | undefined;
    teamName?: string | undefined;
    pageNumber?: string | undefined;
}

export interface IGalleryProps extends RouteComponentProps<TGalleryProps> {
    galleryLoaded: typeof galleryLoaded;
    filterChanged: typeof filterChanged;
    searchClicked: typeof searchClicked;
    pagingClicked: typeof pagingClicked;
}