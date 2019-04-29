import React from 'react';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

import PhotoSlide from './PhotoSlide';

import { ISlideshowProps } from '../interfaces/ISlideshowProps';
import { IPhotosPaginateState } from '../interfaces/IPhotosPaginateState'
import { TSlideshowRouteValues } from '../types/TSlideshowRouteValues';
import { IPhoto } from '../interfaces/IPhoto';
import { Data } from '../services/Data';

interface ISlideshowValues {
    photoId: number;
    tripReportId: number;
    pageNumber: number;
}

class Slideshow extends React.Component<ISlideshowProps, IPhotosPaginateState> {
    
    constructor(props: ISlideshowProps) {
      super(props);

      this.updateRoute = this.updateRoute.bind(this);
      this.handlePageClick = this.handlePageClick.bind(this);
      this.getSlideshowValuesFromRoute = this.getSlideshowValuesFromRoute.bind(this);

      this.state = { isLoading: true, isInvalidRoute: false, pageCount: 0, selectedPage: 0, photos: [] };
    }

    updateRoute(pageNumber: number) {
        this.props.history.push('/what-we-do/photo/' + this.state.photos[pageNumber].id + '/' + this.state.photos[pageNumber].tripReportRoute + '/' + (pageNumber + 1));
    }

    handlePageClick = (data: { selected: number }) => {
        
        this.updateRoute(data.selected);
        this.setState({ selectedPage: data.selected })
    }

    getSlideshowValuesFromRoute(slideshowRouteValues: TSlideshowRouteValues): ISlideshowValues | undefined {

        let pageNumber: number = Number(slideshowRouteValues.pageNumber);

        if (slideshowRouteValues.photoId === undefined || slideshowRouteValues.tripReportDescription === undefined
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

    async componentDidMount() {
        
        this.setState({ isLoading: true, isInvalidRoute: false });

        const slideshowValuesFromRoute: ISlideshowValues | undefined = this.getSlideshowValuesFromRoute(this.props.match.params);

        if (slideshowValuesFromRoute === undefined) {
            this.setState({ isInvalidRoute: true })
            return;
        }

        let data = new Data();
        const photos: IPhoto[] = await data.GetSlideshow(slideshowValuesFromRoute.tripReportId);

        const photosCount: number = photos.length;
        let page: number;

        if (slideshowValuesFromRoute.pageNumber > photosCount || slideshowValuesFromRoute.pageNumber < 1) {
            this.setState({ isInvalidRoute: true })
            return;
        }
        else {
            page = slideshowValuesFromRoute.pageNumber - 1;
        }

        this.setState({ isLoading: false, pageCount: photosCount, selectedPage: page, photos, isInvalidRoute: false });
    }

    render() {
        
        if (this.state.isInvalidRoute === true) {
            return (<div className="row"><h2 className="mx-auto">Sorry, that is not a valid page.</h2></div>);
        }

        if (this.state.isLoading) {
            return (<div className="row"><h2 className="mx-auto">Loading...</h2></div>);
        } else {
            return (

                <div className="row">

                    <div className="mx-auto px-2 col-12 col-lg-9 px-lg-5 col-xl-8">

                        <h3 className="mb-3">{this.state.photos[this.state.selectedPage].team}'s Outing to {this.state.photos[this.state.selectedPage].destination}</h3>

                        <p className="w-100 mb-1 text-left">{ moment(this.state.photos[this.state.selectedPage].date).format('dddd, MMMM D, YYYY') }</p>
                        <p className="w-100 mb-1 text-left">Photo { this.state.selectedPage + 1 } of { this.state.photos.length }</p>
                        <p className="w-100 mb-2 text-left">{ this.state.photos[this.state.selectedPage].caption }</p>

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
                            forcePage={this.state.selectedPage}
                        />

                        <PhotoSlide photo={this.state.photos[this.state.selectedPage]} />

                    </div>

                </div>
            );
        }
    }
}

export default Slideshow;