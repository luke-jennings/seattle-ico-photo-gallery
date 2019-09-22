import React from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import * as toastr from 'toastr';

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
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';

class Slideshow extends React.Component<ISlideshowProps, ISlideshowState> {
    
    private backLinkHref: string | undefined;

    constructor(props: ISlideshowProps) {
      super(props);

      this.updateRoute = this.updateRoute.bind(this);
      this.handlePageClick = this.handlePageClick.bind(this);
      this.getSlideshowValuesFromRoute = this.getSlideshowValuesFromRoute.bind(this);
      this.getRoute = this.getRoute.bind(this);

      this.state = InitialState.Slideshow();
    }

    private updateRoute(pageIndex: number): string  {

        let route: string = this.getRoute(pageIndex, this.state.photos);

        this.props.history.push(route);

        return route;
    }

    private getRoute(pageIndex: number, photos: IPhoto[]): string {

        // Adding the || '' is to make the compiler happy, otherwise it complains that the environment variable could be undefined.
        let rootPath: string = (process.env.REACT_APP_SLIDESHOW_ROOT_PATH || '');
        let photoId: number = photos[pageIndex].id;
        let seoTrRoute: string = photos[pageIndex].tripReportRoute;
        let pageNumber: number = pageIndex + 1;

        let route: string = `${rootPath}${photoId}/${seoTrRoute}/${pageNumber}`;

        return route;
    }

    private handlePageClick = (data: { selected: number }) => {
        
        let route: string = this.updateRoute(data.selected);
        this.setState({ pageIndex: data.selected, route: route }, () => {

            this.props.pagingClicked(this.state);
        });
    }

    private getSlideshowValuesFromRoute(slideshowRouteValues: TSlideshowRouteValues): ISlideshowValues | undefined {

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
     * When the user clicks the browser's back button, update the slideshow page number in the state.
     * 
     * @param prevProps The Slideshow props that have been extended with RouteComponentProps.
     */
    public componentDidUpdate(prevProps: ISlideshowProps) {
        
        const locationChanged: boolean = this.props.location !== prevProps.location;
        const lastSlashIndex = this.props.location.pathname.lastIndexOf('/') + 1;
        const pageValue = this.props.location.pathname.slice(lastSlashIndex);
        const pageNumber = Number(pageValue);

        if (locationChanged) {

            if (!Number.isNaN(pageNumber) && pageValue.length > 0 && Number.isInteger(pageNumber)) {

                const selectedPageFromUrl = Number(pageNumber) - 1;

                // Only update the state if there is a discrepency between the state & url page numbers.
                if (this.state.pageIndex !== selectedPageFromUrl) {
                    this.setState({ pageIndex: selectedPageFromUrl })
                }
            }
        }
    }

    public async componentDidMount() {
        
        // Capture the route from the Gallery before it gets changed to a Slideshow route
        // So can use this for the back link.  If the user browsed here directly without
        // linking from the Gallery this will be the initial state.
        if (this.props.route !== InitialState.MetaData().route) {
            this.backLinkHref = this.props.route;
            
            // NOTE: If using HashRouter, then uncomment these three line and comment the line above.
            // let indexOfHash: number = window.location.href.indexOf('#');
            // let url: string = window.location.href.slice(0, indexOfHash + 1);
            // this.backLinkHref = url + this.props.route;
        }

        this.setState({ arePhotosLoading: true, isInvalidRoute: false });

        const slideshowValuesFromRoute: ISlideshowValues | undefined = this.getSlideshowValuesFromRoute(this.props.match.params);

        if (slideshowValuesFromRoute === undefined) {
            this.setState({ isInvalidRoute: true })
            return;
        }

        let data = new Data();
        let photos: IPhoto[];
        try {
            photos = await data.GetSlideshow(slideshowValuesFromRoute.tripReportId);
        } catch (error) {
            toastr.error('Sorry, there was an error retrieving the photos.', '', ErrorHelpers.GetToastrOptionsForPersistent())
            return;
        }

        const photosCount: number = photos.length;
        let pageIndex: number;

        if (slideshowValuesFromRoute.pageNumber > photosCount || slideshowValuesFromRoute.pageNumber < 1) {
            this.setState({ isInvalidRoute: true })
            return;
        }
        else {
            pageIndex = slideshowValuesFromRoute.pageNumber - 1;
        }

        let route: string = this.getRoute(pageIndex, photos);

        this.setState({ arePhotosLoading: false, pageCount: photosCount, pageIndex: pageIndex, photos, isInvalidRoute: false, route, photosDisplayType: PhotosDisplayType.Slideshow }, () => {
            
            this.props.slideshowLoaded(this.state);
        });
    }

    public render() {
        
        if (this.state.isInvalidRoute === true) {
            return (<div className="row"><h2 className="mx-auto">Sorry, that is not a valid page.</h2></div>);
        }

        if (this.state.arePhotosLoading) {
            return (<div className="row"><h2 className="mx-auto">Loading...</h2></div>);
        } else {
            return (

                <div className="row">

                    <div className="mx-auto px-2 col-12 col-lg-9 px-lg-5 col-xl-8">

                        <h3 className="mb-3">{this.state.photos[this.state.pageIndex].team}'s Outing to {this.state.photos[this.state.pageIndex].destination}</h3>

                        <p className="w-100 mb-1 text-left">{ moment(this.state.photos[this.state.pageIndex].date).format('dddd, MMMM D, YYYY') }</p>
                        <p className="w-100 mb-1 text-left">Photo { this.state.pageIndex + 1 } of { this.state.photos.length }</p>
                        <p className="w-100 mb-2 text-left">{ this.state.photos[this.state.pageIndex].caption }</p>
                        {(this.backLinkHref !== undefined) ? (<p className="w-100 mb-2 text-left"><a href={this.backLinkHref} className="back-link">&lt;&lt; Back</a></p>) : null }

                        <br />

                        <ReactPaginate
                            pageCount={this.state.pageCount}
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
                            onPageChange={this.handlePageClick}
                            disableInitialCallback={true}
                            initialPage={0}
                            containerClassName={'pagination pagination-sm justify-content-center mb-4'}
                            activeClassName={'active'}
                            forcePage={this.state.pageIndex}
                        />

                        <PhotoSlide photo={this.state.photos[this.state.pageIndex]} />

                    </div>

                </div>
            );
        }
    }
}

const mapStateToProps = (state: AppState) => ({
    route: state.metaData.route
});

const mapDispatchToProps = { slideshowLoaded, pagingClicked }

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (Slideshow);