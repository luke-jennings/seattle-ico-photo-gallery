import { RouteComponentProps } from 'react-router-dom';
import { searchClicked, pagingClicked, filterClicked, filterClickedUpdateMetaData, pagingClickedUpdateMetaData } from '../store/Actions';

type TGalleryProps = {
    tripTypeName?: string | undefined;
    teamName?: string | undefined;
    pageNumber?: string | undefined;
}

export interface IGalleryProps extends RouteComponentProps<TGalleryProps> {
    searchClicked: typeof searchClicked;
    pagingClicked: typeof pagingClicked;
    filterClicked: typeof filterClicked;
    filterClickedUpdateMetaData: typeof filterClickedUpdateMetaData;
    pagingClickedUpdateMetaData: typeof pagingClickedUpdateMetaData;
}