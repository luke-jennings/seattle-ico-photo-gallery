import React, { FunctionComponent } from 'react';

import { IThumbnailProps } from '../interfaces/IThumbnailProps';
import moment from 'moment';

/**
 * @description Return a single thumbnail image.
 *
 * @param {IThumbnailProps} {photo, onClick}
 * @returns
 */
const Thumbnail: FunctionComponent<IThumbnailProps> = ({photo, onClick}): JSX.Element => {

    return (
        <React.Fragment>
            <div className="photo-thumbnail col-6 col-sm-6 col-md-3 col-lg-2 mb-3">
                <a onClick={onClick} id={photo.id.toString()}>
                    <img src={ process.env.REACT_APP_PROTOCOL_HOSTNAME + photo.image } alt={ photo.caption } title={ photo.caption } width={ photo.widthThumb } height={ photo.heightThumb } style={{ display: 'block' }} className="rounded mx-auto photo-thumbnail" />
                </a>
                <p className="small mb-0 text-center"><strong>{ moment(photo.date).format('ddd., MMM. D, Y') }</strong></p>
                <p className="small mb-0 text-center">[{ photo.team }] { photo.destination }</p>
            </div>
        </React.Fragment>
    );
}

export default Thumbnail;