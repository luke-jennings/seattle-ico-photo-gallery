import React, { FunctionComponent } from 'react';
import { IPhoto } from '../interfaces/IPhoto';

interface IPhotoSlideProps {
    photo: IPhoto;
}

const PhotoSlide: FunctionComponent<IPhotoSlideProps> = ({photo}) => {

    return <img src={ process.env.REACT_APP_PROTOCOL_HOSTNAME + photo.image } alt={ photo.caption } title={ photo.caption } className="rounded mx-auto photo-slide img-fluid d-block" />
}

export default PhotoSlide;
