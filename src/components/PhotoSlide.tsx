import React from 'react';
import IPhoto from '../interfaces/IPhoto';

const PhotoSlide = (photo: IPhoto): JSX.Element => {

    return <img src={ process.env.REACT_APP_PROTOCOL_HOSTNAME + photo.image } alt={ photo.caption } title={ photo.caption } className="rounded mx-auto photo-slide img-fluid d-block" />;
};

export default PhotoSlide;
