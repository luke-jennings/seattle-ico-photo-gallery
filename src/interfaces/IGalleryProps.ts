import { RouteComponentProps } from 'react-router-dom'

type TGalleryProps = {
    tripTypeName?: string | undefined;
    teamName?: string | undefined;
    pageNumber?: string | undefined;
}

export interface IGalleryProps extends RouteComponentProps<TGalleryProps> {
}