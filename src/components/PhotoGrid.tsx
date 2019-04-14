import React from 'react';
import Photo from './Photo';

import { IPhoto } from '../interfaces/IPhoto';

interface IPhotoGridProps {
    page: number;
    pageSize: number;
    photos: IPhoto[];
}

interface IPhotoGridState {
    page: number;
    photoGrid: number[][];
}

class PhotoGrid extends React.Component<IPhotoGridProps, IPhotoGridState> {

    readonly columns: number = 4;

    constructor(props: IPhotoGridProps) {
        super(props);
        this.state = { page: props.page, photoGrid: [] };
    }

    componentDidUpdate(prevProps: IPhotoGridProps) {
        if ( prevProps.page !== this.props.page ){
            this.getPageOfPhotos(this.props.page);
        }
    }

    getPageOfPhotos(pageNumber: number) {

        const startIndex = pageNumber * this.props.pageSize;
        let pageOfPhotos: IPhoto[] = [];

        for(let i=startIndex; i < this.props.photos.length && i - startIndex < this.props.pageSize; i++) {
            pageOfPhotos.push(this.props.photos[i]);
        }

        let rows: number = Math.ceil((pageOfPhotos.length / this.columns));
        let row;
        let grid: number[][] = [];
        for (let i=0; i < rows; i++) {
          row=[];
          for (let j=0; j < this.columns; j++){
            let index = this.columns * i + j + (pageNumber * this.props.pageSize);
            row.push(index)
          }
          grid.push(row);
        }
        
        this.setState({ photoGrid: grid });
    }

    async componentDidMount() {
        this.getPageOfPhotos(this.props.page);
    }

    public render() {
        if (this.state.photoGrid.length > 0) {
            return (
                <>
                    {
                        this.state.photoGrid.map((row, index) => (
                            <div key={`row${row[0]}`} className="row justify-content-center mb-4">
                                {row.map((photoIndex) => photoIndex < this.props.photos.length ? <Photo photo={this.props.photos[photoIndex]} key={photoIndex} /> : <div key={photoIndex} className="col-6 col-sm-6 col-md-3 col-lg-2 mb-3">&#160;</div>)}
                            </div>
                        ))
                    }
                </>
            );
        } else {
            return (<div className="row"><h5 className="mx-auto">No photos</h5></div>);
        }
    }
}

export default PhotoGrid;