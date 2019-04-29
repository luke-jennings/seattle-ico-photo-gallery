import React, { FunctionComponent } from 'react';
import { IPhoto } from '../interfaces/IPhoto';

interface IPhotoSlideProps {
    photo: IPhoto;
}

const PhotoSlide: FunctionComponent<IPhotoSlideProps> = ({photo}) => {

    return <img src={ 'https://volunteers.seattleico.org:443' + photo.image } alt={ photo.caption } title={ photo.caption } className="rounded mx-auto photo-slide img-fluid d-block" />
}

export default PhotoSlide;
