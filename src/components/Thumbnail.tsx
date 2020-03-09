import React from 'react';
import moment from 'moment';
import { IThumbnailProps } from '../interfaces/IThumbnailProps';

/**
 * @description Return a single thumbnail image.
 *
 * @param props The function to handled clicking the thumbnail and all the details to display an image with its caption information.
 */
const Thumbnail = (props: IThumbnailProps): JSX.Element => {

    return (
        <React.Fragment>
            <div className="photo-thumbnail col-6 col-sm-6 col-md-3 col-lg-2 mb-3">
                <a onClick={props.onClick} id={props.photo.id.toString()}>
                    <img src={ process.env.REACT_APP_PROTOCOL_HOSTNAME + props.photo.image } alt={ props.photo.caption } title={ props.photo.caption } width={ props.photo.widthThumb } height={ props.photo.heightThumb } className="rounded mx-auto" />
                </a>
                <p className="small mb-0 text-center"><strong>{ moment(props.photo.date).format('ddd., MMM. D, Y') }</strong></p>
                <p className="small mb-0 text-center">{`[${ props.photo.team }] ${ props.photo.destination }`}</p>
            </div>
        </React.Fragment>
    );
};

export default Thumbnail;