import React from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import * as toastr from 'toastr';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';

import PhotoSlide from './PhotoSlide';

import { connect } from "react-redux";
import { AppState } from '../store/ConfigureStore';
import { slideshowLoaded, pagingClicked } from '../store/Actions';
import { ISlideshowProps } from '../interfaces/ISlideshowProps';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { TSlideshowRouteValues } from '../types/TSlideshowRouteValues';
import { ISlideshowValues } from '../interfaces/ISlideshowValues';
import { IPhoto } from '../interfaces/IPhoto';
import { Data } from '../services/Data';
import { InitialState } from '../helpers/InitialState';
import { ErrorHelpers } from '../helpers/ErrorHelpers';

const Slideshow = (props: ISlideshowProps): JSX.Element => {

    let history = useHistory();

    let location = useLocation();

    const [slideShowState, setSlideshowState] = React.useState<ISlideshowState>(InitialState.Slideshow());

    function updateRoute(pageIndex: number): string  {

        let route: string = getRoute(pageIndex, slideShowState.photos);

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
        const updatedSlideshowState: ISlideshowState = { ...slideShowState, pageIndex: selectedItem.selected, route: route };

        // Update component state
        setSlideshowState(updatedSlideshowState);
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

    // Replaces componentDidMount
    // When the componet renders it will attempt to load the photos via an API call.
    // Included an empty array as the second parameter to insure this useEffect will only run once.
    React.useEffect(() => {

        const slideshowValuesFromRoute: ISlideshowValues | undefined = getSlideshowValuesFromRoute(props.match.params);

        if (slideshowValuesFromRoute === undefined) {
            setSlideshowState({ ...slideShowState, isInvalidRoute: true });
            return;
        }

        let data: Data = new Data();
        let slideshowPhotos: IPhoto[] = [];

        const getData = async () => {
            
            slideshowPhotos = await data.GetSlideshow(slideshowValuesFromRoute.tripReportId);

            const photosCount: number = slideshowPhotos.length;

            if (slideshowValuesFromRoute.pageNumber > photosCount || slideshowValuesFromRoute.pageNumber < 1) {
                setSlideshowState({ ...slideShowState, isInvalidRoute: true });
                return;
            }

            let pageIndex: number = slideshowValuesFromRoute.pageNumber - 1;
            let route: string = getRoute(pageIndex, slideshowPhotos);
            
            const updatedSlideshowState: ISlideshowState = { ...slideShowState, arePhotosLoading: false, photos: slideshowPhotos, pageCount: photosCount, pageIndex: pageIndex, route };
            setSlideshowState(updatedSlideshowState);
            props.slideshowLoaded(updatedSlideshowState);
        };

        try {
            getData();
        } catch (error) {
            toastr.error('Sorry, there was an error retrieving the photos.', '', ErrorHelpers.GetToastrOptionsForPersistent())
            return;
        }
    }, []);

    if (slideShowState.isInvalidRoute === true) {
        return (<div className="row"><h2 className="mx-auto">Sorry, that is not a valid page.</h2></div>);
    }

    if (slideShowState.arePhotosLoading) {
        return (<div className="row"><h2 className="mx-auto">Loading...</h2></div>);
    } else {
        
        return (
            <div className="row">

                <div className="mx-auto px-2 col-12 col-lg-9 px-lg-5 col-xl-8">

                    <h3 className="mb-3">{slideShowState.photos[slideShowState.pageIndex].team}'s Outing to {slideShowState.photos[slideShowState.pageIndex].destination}</h3>

                    <p className="w-100 mb-1 text-left">{ moment(slideShowState.photos[slideShowState.pageIndex].date).format('dddd, MMMM D, YYYY') }</p>
                    <p className="w-100 mb-1 text-left">Photo { slideShowState.pageIndex + 1 } of { slideShowState.photos.length }</p>
                    <p className="w-100 mb-2 text-left">{ slideShowState.photos[slideShowState.pageIndex].caption }</p>
                    {props.routeBackToGallery !== null ? (<p className="w-100 mb-2 text-left"><a href={props.routeBackToGallery} className="back-link">&lt;&lt; Back</a></p>) : null }

                    <br />

                    <ReactPaginate
                        pageCount={slideShowState.pageCount}
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
                        forcePage={slideShowState.pageIndex}
                    />

                    <PhotoSlide photo={slideShowState.photos[slideShowState.pageIndex]} />

                    <p className="w-100 mt-2 text-right"><a href={process.env.REACT_APP_PROTOCOL_HOSTNAME + slideShowState.photos[slideShowState.pageIndex].tripSummaryRoute} className="back-link" target="_blank">Trip Summary {String.fromCharCode(62, 62)}</a></p>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        route: state.metaData.route,
        routeBackToGallery: state.metaData.routeBackToGallery
    }
};

const mapDispatchToProps = { slideshowLoaded, pagingClicked }

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (Slideshow);