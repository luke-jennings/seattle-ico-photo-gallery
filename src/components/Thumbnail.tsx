import React from 'react';

import { IThumbnailProps } from '../interfaces/IThumbnailProps';
import moment from 'moment';

class Thumbnail extends React.Component<IThumbnailProps> {
    
    public constructor(props: IThumbnailProps) {
      super(props);
    }

    public render() {
        return (
            <>
                <div className="photo-thumbnail col-6 col-sm-6 col-md-3 col-lg-2 mb-3">
                    <a onClick={this.props.onClick} id={this.props.photo.id.toString()}>
                        <img src={ process.env.REACT_APP_PROTOCOL_HOSTNAME + this.props.photo.image } alt={ this.props.photo.caption } title={ this.props.photo.caption } width={ this.props.photo.widthThumb } height={ this.props.photo.heightThumb } style={{ display: 'block' }} className="rounded mx-auto photo-thumbnail" />
                    </a>
                    <p className="small mb-0 text-center"><strong>{ moment(this.props.photo.date).format('ddd., MMM. D, Y') }</strong></p>
                    <p className="small mb-0 text-center">[{ this.props.photo.team }] { this.props.photo.destination }</p>
                </div>
            </>
        );
    }
}

export default Thumbnail;