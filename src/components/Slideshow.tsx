import React from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import * as toastr from 'toastr';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';

import PhotoSlide from './PhotoSlide';

import { connect } from "react-redux";
import { AppState } from '../store/ConfigureStore';
import { slideshowLoaded, pagingClicked, invalidRoute } from '../store/Actions';
import { ISlideshowProps } from '../interfaces/ISlideshowProps';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { TSlideshowRouteValues } from '../types/TSlideshowRouteValues';
import { ISlideshowValues } from '../interfaces/ISlideshowValues';
import { IPhoto } from '../interfaces/IPhoto';
import { Data } from '../services/Data';
import { ErrorHelpers } from '../helpers/ErrorHelpers';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';

const Slideshow = (props: ISlideshowProps): JSX.Element => {

    let history = useHistory();

    let location = useLocation();

    function updateRoute(pageIndex: number): string  {

        let route: string = getRoute(pageIndex, props.photos);

        history.push(route);

        return route;
    }

    function getRoute(pageIndex: number, photos: IPhoto[]): string {

        // Adding the || '' is to make the compiler happy, otherwise it complains that the environment variable could be undefined.
        let rootPath: string = (process.env.REACT_APP_SLIDESHOW_ROOT_PATH || '');
        let photoId: number = photos[pageIndex].id;
        let seoTrRoute: string = photos[pageIndex].tripReportRoute;
        let pageNumber: number = pageIndex + 1;

        let route: string = `${rootPath}${photoId}/${seoTrRoute}/${pageNumber}`;

        return route;
    }

    function handlePageClick(selectedItem: { selected: number; }): void {

        const route: string = updateRoute(selectedItem.selected);
        const updatedSlideshowState: ISlideshowState = { ...props, pageIndex: selectedItem.selected, route: route };

        // Update Redux
        props.pagingClicked(updatedSlideshowState);
    }

    function getSlideshowValuesFromRoute(slideshowRouteValues: TSlideshowRouteValues): ISlideshowValues | undefined {

        let pageNumber: number = Number(slideshowRouteValues.pageNumber);

        if (slideshowRouteValues.photoId === undefined
            || slideshowRouteValues.tripReportDescription === undefined
            || (slideshowRouteValues.pageNumber !== undefined && Number.isNaN(pageNumber))) {
            return undefined;
        }

        const photoId: number = Number(slideshowRouteValues.photoId);

        const index: number = slideshowRouteValues.tripReportDescription.lastIndexOf('-');
        const tripReportIdFromRoute: string = slideshowRouteValues.tripReportDescription.substring(index + 1);

        const tripReportId: number = Number(tripReportIdFromRoute);

        if (Number.isNaN(photoId) || Number.isNaN(tripReportId)) {
            return undefined;
        }

        return { photoId, tripReportId, pageNumber };
    }

    /**
     * When the user clicks the "<< Back" link update the history so the route will be updated back to 
     * the gallery thumbnail view that the user had previously clicked on to get to the slideshow.
     *
     * @param {React.MouseEvent<HTMLAnchorElement, MouseEvent>} event The click event, used to prevent the anchor tag click action.
     */
    function handleBackToGalleryClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {

        event.preventDefault();
        
        if (props.routeBackToGallery !== null) {

            history.push(props.routeBackToGallery);
        }
    }

    // Replaces componentDidMount
    // When the componet renders it will attempt to load the photos via an API call.
    // Included an empty array as the second parameter to insure this useEffect will only run once.
    React.useEffect(() => {

        const slideshowValuesFromRoute: ISlideshowValues | undefined = getSlideshowValuesFromRoute(props.match.params);

        const invalidRouteState: IMetaDataState = { ...props, isInvalidRoute: true, arePhotosLoading: false, route: location.pathname, photosDisplayType: PhotosDisplayType.Slideshow }
        const invalidRouteErrorMessage: string = 'The route parameters are either of the wrong type or out of range.';

        if (slideshowValuesFromRoute === undefined) {
            
            props.invalidRoute(invalidRouteState);
            toastr.error(invalidRouteErrorMessage, '', ErrorHelpers.GetToastrOptionsForLongerTimeout());
            return;
        }

        let data: Data = new Data();
        let slideshowPhotos: IPhoto[] = [];

        const getData = async () => {
            
            slideshowPhotos = await data.GetSlideshow(slideshowValuesFromRoute.tripReportId);

            const photosCount: number = slideshowPhotos.length;

            if (slideshowValuesFromRoute.pageNumber > photosCount || slideshowValuesFromRoute.pageNumber < 1) {
                
                props.invalidRoute(invalidRouteState);
                toastr.error(invalidRouteErrorMessage, '', ErrorHelpers.GetToastrOptionsForLongerTimeout());
                return;
            }

            let pageIndex: number = slideshowValuesFromRoute.pageNumber - 1;
            let route: string = getRoute(pageIndex, slideshowPhotos);
            
            const updatedSlideshowState: ISlideshowState = { ...props, arePhotosLoading: false, photos: slideshowPhotos, pageCount: photosCount, pageIndex: pageIndex, route };
            props.slideshowLoaded(updatedSlideshowState);
        };

        try {
            getData();
        } catch (error) {
            toastr.error('Sorry, there was an error retrieving the photos.', '', ErrorHelpers.GetToastrOptionsForPersistent());
            return;
        }
    }, []);

    if (props.isInvalidRoute === true) {
        return (<div className="row"><h2 className="mx-auto">Sorry, that is not a valid page.</h2></div>);
    }

    if (props.arePhotosLoading) {
        return (<div className="row"><h2 className="mx-auto">Loading...</h2></div>);
    } else {
        
        return (
            <div className="row">

                <div className="mx-auto px-2 col-12 col-lg-9 px-lg-5 col-xl-8">

                    <h3 className="mb-3">{props.photos[props.pageIndex].team}'s Outing to {props.photos[props.pageIndex].destination}</h3>

                    <p className="w-100 mb-1 text-left">{ moment(props.photos[props.pageIndex].date).format('dddd, MMMM D, YYYY') }</p>
                    <p className="w-100 mb-1 text-left">Photo { props.pageIndex + 1 } of { props.photos.length }</p>
                    <p className="w-100 mb-2 text-left">{ props.photos[props.pageIndex].caption }</p>
                    {props.routeBackToGallery !== null ? (<p className="w-100 mb-2 text-left"><a onClick={handleBackToGalleryClick} href="#" className="back-link">&lt;&lt; Back</a></p>) : null }

                    <br />

                    <ReactPaginate
                        pageCount={props.pageCount}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={3}
                        previousLabel={'<<'}
                        nextLabel={'>>'}
                        breakLabel={'...'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link rounded-left'}
                        nextClassName={'page-item rounded-right'}
                        nextLinkClassName={'page-link'}
                        disabledClassName={'disabled'}
                        onPageChange={handlePageClick}
                        disableInitialCallback={true}
                        initialPage={0}
                        containerClassName={'pagination pagination-sm justify-content-center mb-4'}
                        activeClassName={'active'}
                        forcePage={props.pageIndex}
                    />

                    <PhotoSlide photo={props.photos[props.pageIndex]} />

                    <p className="w-100 mt-2 text-right"><a href={process.env.REACT_APP_PROTOCOL_HOSTNAME + props.photos[props.pageIndex].tripSummaryRoute} className="back-link" target="_blank">Trip Summary {String.fromCharCode(62, 62)}</a></p>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        isInvalidRoute: state.metaData.isInvalidRoute,
        arePhotosLoading: state.metaData.arePhotosLoading,
        routeBackToGallery: state.metaData.routeBackToGallery,
        photos: state.pages.photos,
        pageIndex: state.pages.pageIndex,
        pageCount: state.pages.pageCount
    }
};

const mapDispatchToProps = { slideshowLoaded, pagingClicked, invalidRoute }

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (Slideshow);