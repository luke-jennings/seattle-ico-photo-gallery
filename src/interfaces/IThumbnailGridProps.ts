import { MouseEvent } from 'react';
import { IPhoto } from './IPhoto';

export interface IThumbnailGridProps {
    page: number;
    pageSize: number;
    photos: IPhoto[];
    onPageChange: (event: MouseEvent<HTMLAnchorElement>) => void
}