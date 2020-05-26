import React, { FunctionComponent, useState, useEffect } from 'react';
import IPhoto from '../interfaces/IPhoto';
import IThumbnailGridProps from '../interfaces/IThumbnailGridProps';
import IThumbnailGridState from '../interfaces/IThumbnailGridState';
import Thumbnail from './Thumbnail';

/**
 * @description For the given paging page generate the photos as a grid of thumbnail images.
 * 
 * @param {IThumbnailGridProps} {page, pageSize, photos, onPageChange}
 * @returns {JSX.Element}
 */
const ThumbnailGrid: FunctionComponent<IThumbnailGridProps> = ({ page, pageSize, photos, onPageChange }): JSX.Element => {

    const columns = 4;

    const initialState: IThumbnailGridState = { page: page, photoGrid: [] };

    const [state, setState] = useState(initialState);

    function getPageOfPhotos(pageNumber: number): void {

        const startIndex = pageNumber * pageSize;
        const pageOfPhotos: IPhoto[] = [];

        for(let i=startIndex; i < photos.length && i - startIndex < pageSize; i++) {
            pageOfPhotos.push(photos[i]);
        }

        const rows: number = Math.ceil((pageOfPhotos.length / columns));
        let row;
        const grid: number[][] = [];
        for (let i=0; i < rows; i++) {
          row=[];
          for (let j=0; j < columns; j++) {
            const index = columns * i + j + (pageNumber * pageSize);
            row.push(index);
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
                    state.photoGrid.map((row: number[], photoGridIndex: number) => {
                        
                        return (<div key={photoGridIndex} className="row justify-content-center mb-4">
                                    {row.map((photoIndex: number, rowIndex: number) => { 
                                        return photoIndex < photos.length ? <Thumbnail photo={photos[photoIndex]} key={rowIndex} onClick={onPageChange} /> : <div key={rowIndex} className="col-6 col-sm-6 col-md-3 col-lg-2 mb-3">&#160;</div>;
                                    })}
                                </div>);
                    })
                }
            </React.Fragment>
        );
    } else {
        return (<div className="row"><h5 className="mx-auto">No photos</h5></div>);
    }
};

export default ThumbnailGrid;