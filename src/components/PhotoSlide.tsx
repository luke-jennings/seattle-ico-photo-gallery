import React, { FunctionComponent } from 'react';
import { IPhotoSlideProps } from '../interfaces/IPhotoSlideProps';

const PhotoSlide: FunctionComponent<IPhotoSlideProps> = ({photo}) => {

    return <img src={ process.env.REACT_APP_PROTOCOL_HOSTNAME + photo.image } alt={ photo.caption } title={ photo.caption } className="rounded mx-auto photo-slide img-fluid d-block" />
}

export default PhotoSlide;
