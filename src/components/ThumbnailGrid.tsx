import React from 'react';
import Thumbnail from './Thumbnail';

import { IThumbnailGridProps } from '../interfaces/IThumbnailGridProps';
import { IThumbnailGridState } from '../interfaces/IThumbnailGridState';
import { IPhoto } from '../interfaces/IPhoto';

class ThumbnailGrid extends React.Component<IThumbnailGridProps, IThumbnailGridState> {

    readonly columns: number = 4;

    public constructor(props: IThumbnailGridProps) {
        super(props);
        this.state = { page: props.page, photoGrid: [] };
    }

    private getPageOfPhotos(pageNumber: number) {

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

    public componentDidUpdate(prevProps: IThumbnailGridProps) {
        if ( prevProps.page !== this.props.page ){
            this.getPageOfPhotos(this.props.page);
        }
    }

    public async componentDidMount() {
        this.getPageOfPhotos(this.props.page);
    }

    public render() {
        if (this.state.photoGrid.length > 0) {
            return (
                <>
                    {
                        this.state.photoGrid.map((row, index) => (
                            <div key={`row${row[0]}`} className="row justify-content-center mb-4">
                                {row.map((photoIndex) => photoIndex < this.props.photos.length ? <Thumbnail photo={this.props.photos[photoIndex]} key={photoIndex} onClick={this.props.onPageChange} /> : <div key={photoIndex} className="col-6 col-sm-6 col-md-3 col-lg-2 mb-3">&#160;</div>)}
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

export default ThumbnailGrid;