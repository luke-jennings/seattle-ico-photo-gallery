import { MouseEvent } from 'react';
import IPhoto from './IPhoto';

interface IThumbnailGridProps {

    page: number;

    pageSize: number;

    photos: IPhoto[];

    onPageChange: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default IThumbnailGridProps;