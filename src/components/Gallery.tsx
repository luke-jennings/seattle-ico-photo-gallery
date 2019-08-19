import React, { ChangeEvent, MouseEvent } from 'react';

import Filter from './Filter'
import ThumbnailGrid from './ThumbnailGrid';

import ReactPaginate from 'react-paginate';

import { IGalleryProps } from '../interfaces/IGalleryProps';
import { IGalleryState } from '../interfaces/IGalleryState';
import { IFiltersSelectedState } from '../interfaces/IFiltersSelectedState';
import { IFilterOptions } from '../interfaces/IFilterOptions';
import { Data } from '../services/Data';
import { ISelectOption } from '../interfaces/ISelectOption';
import { IPhoto } from '../interfaces/IPhoto';

import { AppState } from '../store/ConfigureStore';
import { connect } from "react-redux";
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';
import { searchClicked, pagingClicked, filterChanged, galleryLoaded } from '../store/Actions';
import { ISelectOptionRoute } from '../interfaces/ISelectOptionRoute';

class Gallery extends React.Component<IGalleryProps, IGalleryState> {

    filterOptions: IFilterOptions;
    
    readonly pageSize: number = 12;
    

    constructor(props: IGalleryProps) {
        
        super(props);

        this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.updateStateFromFilter = this.updateStateFromFilter.bind(this);
        this.filterOptions = { tripTypeOptions: [], teamOptions: [] };
        this.state = { tripType: {} as ISelectOption, team: {} as ISelectOption, filterMessage: '', arePhotosLoading: true, isInvalidRoute: false, pageCount: 0, pageIndex: 0, photos: [], route: '', photosDisplayType: PhotosDisplayType.NotSet };
    }

    handleTripTypeChange(event: ChangeEvent<HTMLSelectElement>) {

        let tripTypeSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text }

        this.setState({ tripType: tripTypeSelected }, () => {
            
            this.props.filterChanged({ team: this.state.team, tripType: this.state.tripType })
        });
    }
    
    handleTeamChange(event: ChangeEvent<HTMLSelectElement>) {

        let teamSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text }

        this.setState({ team: teamSelected }, () => {

            this.props.filterChanged({ team: this.state.team, tripType: this.state.tripType })
        });
    }

    async updateStateFromFilter() {
        this.setState({ arePhotosLoading: true });
        const photosFromFilter: IPhoto[] = await this.getPhotos(this.state.tripType.value, this.state.team.value);
        const totalPages = this.calculateTotalPages(photosFromFilter.length);
        let route:string = this.updateGalleryRoute(this.state.tripType.value, this.state.team.value, 0);
        this.setState({ photos: photosFromFilter, pageCount: totalPages, pageIndex: 0, arePhotosLoading: false, route: route }, () => {
            // Set state is asynchronous, so wait for state mutation to complete
            // and use setState's callback function to update the redux store

            this.props.searchClicked(this.state);
        });
    }

    updateGalleryRoute(tripTypeId: number, teamId: number, pageIndex: number): string {
        const tripTypeRoute: string = this.filterOptions.tripTypeOptions.filter(tto => tto.value == tripTypeId)[0].routeName;
        const teamRoute: string = this.filterOptions.teamOptions.filter(to => to.value == teamId)[0].routeName;
        let route: string = process.env.REACT_APP_GALLERY_ROOT_PATH + tripTypeRoute + '/' + teamRoute + '/' + (pageIndex + 1);
        this.props.history.push(route);
        return route;
    }

    getFilterValuesFromRoute(tripTypeRouteName: string | undefined, teamRouteName: string | undefined): IFiltersSelectedState | undefined {

        if (tripTypeRouteName === undefined && teamRouteName === undefined) {
            return { tripType: { value: 0, text: 'All' }, team: { value: 0, text: 'All' } };
        }

        if (tripTypeRouteName === undefined || teamRouteName === undefined) {
            return undefined;
        }

        const tripTypeSelectOptionRoute: ISelectOptionRoute = this.filterOptions.tripTypeOptions.filter(tto => tto.routeName.toLowerCase() === tripTypeRouteName.toLowerCase())[0];
        const teamSelectOptionRoute: ISelectOptionRoute = this.filterOptions.teamOptions.filter(to => to.routeName.toLowerCase() == teamRouteName.toLowerCase())[0];

        // Destructure the tripTypeSelectOptionRoute to remove the routeName.
        let { routeName, ...tripTypeSelectOption } = tripTypeSelectOptionRoute
        // Unfortunately can't use destructuring again since can't declare the variable routeName again, so have to get the properties by assignment.
        let teamSelectOption: ISelectOption = { value: teamSelectOptionRoute.value, text: teamSelectOptionRoute.text }

        if (tripTypeSelectOption !== undefined && teamSelectOption !== undefined) {
            return { tripType: tripTypeSelectOption, team: teamSelectOption };
        }

        return undefined;
    }

    handlePageClick = (data: { selected: number }) => {
        
        let route:string = this.updateGalleryRoute(this.state.tripType.value, this.state.team.value, data.selected);

        this.setState({ pageIndex: data.selected, route: route }, () => {
            // Set state is asynchronous, so wait for state mutation to complete
            // and use setState's callback function to update the redux store

            //this.props.pagingClicked(this.state);
            this.props.pagingClicked(this.state);
        });
    }

    handleThumbnailClick = (event: MouseEvent<HTMLAnchorElement>) => {
        
        const photoId: number = Number(event.currentTarget.id);

        const photo: IPhoto = this.state.photos.filter(p => p.id === photoId)[0];
        
        const photos: IPhoto[] = this.state.photos.filter(p => p.tripReportId === photo.tripReportId);

        const page: number = photos.indexOf(photo) + 1;

        // Adding the || '' is to make the compiler happy, otherwise it complains that the environment variable could be undefined.
        this.props.history.push((process.env.REACT_APP_SLIDESHOW_ROOT_PATH || '') + photo.id + '/' + photo.tripReportRoute + '/' + page);
    }

    calculateTotalPages(numberOfPhotos: number): number {

        return Math.ceil(numberOfPhotos/this.pageSize)
    }

    async getPhotos(tripTypeId: number, teamId: number): Promise<IPhoto[]> {

        let data = new Data();
        const photos = await data.GetPhotos(tripTypeId, teamId);
        
        return photos;
    }

    /**
     * When the user clicks the browser's back button, update the gallery page number in the state.
     * 
     * @param prevProps The Gallery props that have been extended with RouteComponentProps.
     */
    componentDidUpdate(prevProps: IGalleryProps, prevState: IGalleryState) {

        const locationChanged: boolean = this.props.location !== prevProps.location;
        const lastSlashIndex = this.props.location.pathname.lastIndexOf('/') + 1;
        const pageValue = this.props.location.pathname.slice(lastSlashIndex);
        const pageNumber = Number(pageValue);

        if (locationChanged) {

            if (this.props.location.pathname === process.env.REACT_APP_GALLERY_ROOT_PATH && pageValue.length == 0) {

                this.setState({ pageIndex: 0 });
            }
            else if (!Number.isNaN(pageNumber) && Number.isInteger(pageNumber)) {

                const selectedPageFromUrl = Number(pageNumber) - 1;

                // Only update the state if there is a discrepency between the state & url page numbers.
                if (this.state.pageIndex !== selectedPageFromUrl){
                    this.setState({ pageIndex: selectedPageFromUrl })
                }
            }
        }

        if (prevProps.photos !== this.props.photos) {

            let message: string = `${ this.props.photos.length } photos of type ${ this.props.filterOptionsSelected.tripType.text } and team ${ this.props.filterOptionsSelected.team.text }.`;
            this.setState({ filterMessage: message });
        }
    }
    
    async componentDidMount() {
        
        this.setState({ arePhotosLoading: true, isInvalidRoute: false });

        let data = new Data();
        this.filterOptions = await data.GetFilterOptions();

        const filterValuesFromRoute: IFiltersSelectedState | undefined = this.getFilterValuesFromRoute(this.props.match.params.tripTypeName, this.props.match.params.teamName);

        if (filterValuesFromRoute === undefined) {
            this.setState({ isInvalidRoute: true })
            return;
        }

        this.setState({ tripType: (filterValuesFromRoute.tripType), team: filterValuesFromRoute.team });

        const photosFromRouteValues = await this.getPhotos(filterValuesFromRoute.tripType.value, filterValuesFromRoute.team.value);
        
        const totalPages = this.calculateTotalPages(photosFromRouteValues.length);

        const pageFromRouteValues: number = Number(this.props.match.params.pageNumber);
        let page: number;

        if (Number.isNaN(pageFromRouteValues)) {
            if (this.props.location.pathname === process.env.REACT_APP_GALLERY_ROOT_PATH) {
                page = 0;
            } else {
                this.setState({ isInvalidRoute: true })
                return;
            }
        }
        else if (pageFromRouteValues > totalPages || pageFromRouteValues < 1) {
            this.setState({ isInvalidRoute: true })
            return;
        }
        else {
            page = pageFromRouteValues - 1;
        }

        let route:string = this.updateGalleryRoute(filterValuesFromRoute.tripType.value, filterValuesFromRoute.team.value, page);

        this.setState({ arePhotosLoading: false, pageCount: totalPages, pageIndex: page, photos: photosFromRouteValues, photosDisplayType: PhotosDisplayType.Thumbnails, route: route }, () => {
            // Set state is asynchronous, so wait for state mutation to complete
            // and use setState's callback function to update the redux store

            this.props.galleryLoaded(this.state);
        });
    }

    render() {
        
        if (this.state.isInvalidRoute === true) {

            return (
                <div className="App container mb-2">
                    <div className="row"><h2 className="mx-auto">Sorry, that is not a valid page.</h2></div>
                </div>);

        } else {

            return (
                <div className="App container mb-2">

                    <div className="row">
                        <Filter
                            values={{ tripType: this.state.tripType, team: this.state.team}}
                            options = {this.filterOptions}
                            onTripTypeChange={this.handleTripTypeChange}
                            onTeamChange={this.handleTeamChange}
                            onSubmit={this.updateStateFromFilter}
                            />
                    </div>

                    <div className="container">

                        {this.state.arePhotosLoading ? 
                        (<h2 className="mx-auto">Loading Photos...</h2>) :
                        (<div>
                                <p className="w-100 text-center mb-3">{ this.state.filterMessage }</p>

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

                                <ThumbnailGrid page={this.state.pageIndex} pageSize={this.pageSize} photos={this.state.photos} onPageChange={this.handleThumbnailClick} />
                        </div>)}
                    </div>

                </div>
            );

        }
    }
}

const mapStateToProps = (state: AppState) => ({
    photos: state.photos.photos,
    filterOptionsSelected: { tripType: state.filter.tripType, team: state.filter.team }
});

const mapDispatchToProps = { searchClicked, pagingClicked, filterChanged, galleryLoaded }

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (Gallery);
