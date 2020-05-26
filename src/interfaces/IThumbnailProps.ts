import { MouseEvent } from 'react';
import IPhoto from './IPhoto';

interface IThumbnailProps {

    photo: IPhoto;
    
    onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export default IThumbnailProps;