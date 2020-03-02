import React, { FunctionComponent, useState, useEffect } from 'react';
import Thumbnail from './Thumbnail';

import { IThumbnailGridProps } from '../interfaces/IThumbnailGridProps';
import { IThumbnailGridState } from '../interfaces/IThumbnailGridState';
import { IPhoto } from '../interfaces/IPhoto';

/**
 * @description For the given paging page generate the photos as a grid of thumbnail images.
 * 
 * @param {IThumbnailGridProps} {page, pageSize, photos, onPageChange}
 * @returns {JSX.Element}
 */
const ThumbnailGrid: FunctionComponent<IThumbnailGridProps> = ({page, pageSize, photos, onPageChange}): JSX.Element => {

    const columns: number = 4;

    const initialState: IThumbnailGridState = { page: page, photoGrid: [] };

    const [state, setState] = useState(initialState);

    function getPageOfPhotos(pageNumber: number): void {

        const startIndex = pageNumber * pageSize;
        let pageOfPhotos: IPhoto[] = [];

        for(let i=startIndex; i < photos.length && i - startIndex < pageSize; i++) {
            pageOfPhotos.push(photos[i]);
        }

        let rows: number = Math.ceil((pageOfPhotos.length / columns));
        let row;
        let grid: number[][] = [];
        for (let i=0; i < rows; i++) {
          row=[];
          for (let j=0; j < columns; j++){
            let index = columns * i + j + (pageNumber * pageSize);
            row.push(index)
          }
          grid.push(row);
        }
        
        setState({ ...state, photoGrid: grid });
    }

    // When the paging page # updates, update the grid of photos.
    useEffect(() => {
        getPageOfPhotos(page);
    }, [page]);

    if (state.photoGrid.length > 0) {
        return (
            <React.Fragment>
                {
                    state.photoGrid.map((row, index) => (
                        <div key={`row${row[0]}`} className="row justify-content-center mb-4">
                            {row.map((photoIndex) => photoIndex < photos.length ? <Thumbnail photo={photos[photoIndex]} key={photoIndex} onClick={onPageChange} /> : <div key={photoIndex} className="col-6 col-sm-6 col-md-3 col-lg-2 mb-3">&#160;</div>)}
                        </div>
                    ))
                }
            </React.Fragment>
        );
    } else {
        return (<div className="row"><h5 className="mx-auto">No photos</h5></div>);
    }
}

export default ThumbnailGrid;