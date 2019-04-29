import { MouseEvent } from 'react';
import { IPhoto } from './IPhoto';

export interface IThumbnailProps {
    photo: IPhoto;
    onClick: (event: MouseEvent<HTMLAnchorElement>) => void
}