import React, { FormEvent, ChangeEvent, MouseEvent } from 'react';

import Filter from './Filter'
import ThumbnailGrid from './ThumbnailGrid';

import ReactPaginate from 'react-paginate';
import * as toastr from 'toastr';

import { IGalleryProps } from '../interfaces/IGalleryProps';
import { IGalleryState } from '../interfaces/IGalleryState';
import { IFilterSelectedOptionsState } from '../interfaces/IFilterSelectedOptionsState';
import { IFilterOptions } from '../interfaces/IFilterOptions';
import { Data } from '../services/Data';
import { ISelectOption } from '../interfaces/ISelectOption';
import { IPhoto } from '../interfaces/IPhoto';

import { AppState } from '../store/ConfigureStore';
import { connect } from "react-redux";
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';
import { searchClicked, pagingClicked, filterChanged, galleryLoaded } from '../store/Actions';
import { ISelectOptionRoute } from '../interfaces/ISelectOptionRoute';
import { InitialState } from '../helpers/InitialState';
import { GalleryHelpers } from '../helpers/GalleryHelpers';
import { ErrorHelpers } from '../helpers/ErrorHelpers';

class Gallery extends React.Component<IGalleryProps, IGalleryState> {

    public constructor(props: IGalleryProps) {
        
        super(props);

        this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.handleSearchClicked = this.handleSearchClicked.bind(this);
        
        this.state = InitialState.Gallery();
    }

    private handleTripTypeChange(event: ChangeEvent<HTMLSelectElement>) {

        let tripTypeSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text }

        this.setState({ tripType: tripTypeSelected }, () => {
            
            this.props.filterChanged({ team: this.state.team, tripType: this.state.tripType })
        });
    }
    
    private handleTeamChange(event: ChangeEvent<HTMLSelectElement>) {

        let teamSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text }

        this.setState({ team: teamSelected }, () => {

            this.props.filterChanged({ team: this.state.team, tripType: this.state.tripType })
        });
    }

    private async handleSearchClicked(event: FormEvent<HTMLFormElement>) {

        event.preventDefault();

        this.setState({ arePhotosLoading: true });
        const photosFromFilter: IPhoto[] = await this.getPhotos(this.state.tripType.value, this.state.team.value);
        const totalPages = GalleryHelpers.CalculateTotalPages(photosFromFilter.length, this.state.pageSize);
        let route:string = this.updateGalleryRoute(this.state.tripType.value, this.state.team.value, 0);
        this.setState({ photos: photosFromFilter, pageCount: totalPages, pageIndex: 0, arePhotosLoading: false, route: route }, () => {
            // Set state is asynchronous, so wait for state mutation to complete
            // and use setState's callback function to update the redux store

            this.props.searchClicked(this.state);
        });
    }

    private updateGalleryRoute(tripTypeId: number, teamId: number, pageIndex: number): string {
        const tripTypeRoute: string = this.state.filterOptions.tripTypeOptions.filter(tto => tto.value == tripTypeId)[0].routeName;
        const teamRoute: string = this.state.filterOptions.teamOptions.filter(to => to.value == teamId)[0].routeName;
        let route: string = GalleryHelpers.BuildPath(tripTypeRoute, teamRoute, pageIndex);
        
        this.props.history.push(route);
        
        return route;
    }

    private getFilterSelectedOptionsFromRoute(filterOptions: IFilterOptions, tripTypeRouteName: string | undefined, teamRouteName: string | undefined): IFilterSelectedOptionsState | undefined {

        if (tripTypeRouteName === undefined && teamRouteName === undefined) {
            return { tripType: { value: 0, text: 'All' }, team: { value: 0, text: 'All' } };
        }

        if (tripTypeRouteName === undefined || teamRouteName === undefined) {
            return undefined;
        }

        const tripTypeSelectOptionRoute: ISelectOptionRoute = filterOptions.tripTypeOptions.filter(tto => tto.routeName.toLowerCase() === tripTypeRouteName.toLowerCase())[0];
        const teamSelectOptionRoute: ISelectOptionRoute = filterOptions.teamOptions.filter(to => to.routeName.toLowerCase() == teamRouteName.toLowerCase())[0];

        // Destructure the tripTypeSelectOptionRoute to remove the routeName.
        let { routeName, ...tripTypeSelectOption } = tripTypeSelectOptionRoute
        // Unfortunately can't use destructuring again since can't declare the variable routeName again, so have to get the properties by assignment.
        let teamSelectOption: ISelectOption = { value: teamSelectOptionRoute.value, text: teamSelectOptionRoute.text }

        if (tripTypeSelectOption !== undefined && teamSelectOption !== undefined) {
            return { tripType: tripTypeSelectOption, team: teamSelectOption };
        }

        return undefined;
    }

    private handlePageClick = (data: { selected: number }) => {
        
        let route:string = this.updateGalleryRoute(this.state.tripType.value, this.state.team.value, data.selected);

        this.setState({ pageIndex: data.selected, route: route }, () => {
            // Set state is asynchronous, so wait for state mutation to complete
            // and use setState's callback function to update the redux store

            //this.props.pagingClicked(this.state);
            this.props.pagingClicked(this.state);
        });
    }

    private handleThumbnailClick = (event: MouseEvent<HTMLAnchorElement>) => {
        
        const photoId: number = Number(event.currentTarget.id);

        const photo: IPhoto = this.state.photos.filter(p => p.id === photoId)[0];
        
        const photos: IPhoto[] = this.state.photos.filter(p => p.tripReportId === photo.tripReportId);

        const page: number = photos.indexOf(photo) + 1;

        // Adding the || '' is to make the compiler happy, otherwise it complains that the environment variable could be undefined.
        let path: string = `${(process.env.REACT_APP_SLIDESHOW_ROOT_PATH || '')}${photo.id}/${photo.tripReportRoute}/${page}`;

        this.props.history.push(path);
    }

    private async getPhotos(tripTypeId: number, teamId: number): Promise<IPhoto[]> {

        let data = new Data();
        const photos = await data.GetPhotos(tripTypeId, teamId);
        
        return photos;
    }

    /**
     * When the user clicks the browser's back button, update the gallery page number in the state.
     * 
     * @param prevProps The Gallery props that have been extended with RouteComponentProps.
     */
    public componentDidUpdate(prevProps: IGalleryProps, prevState: IGalleryState) {

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
    }
    
    public async componentDidMount() {
        
        this.setState({ arePhotosLoading: true, isInvalidRoute: false });

        let filterOptions: IFilterOptions | null = null;

        let data = new Data();
        try {
            filterOptions = await data.GetFilterOptions();
        }
        catch(error) {
            toastr.error('Sorry, there was an error retrieving the filter options.', '', ErrorHelpers.GetToastrOptions());
        }

        let { tripType, team } = InitialState.Filters();
        let filterSelectedOptionsFromRoute: IFilterSelectedOptionsState | undefined = { tripType, team };

        if (filterOptions !== null && typeof filterOptions !== 'undefined') {

            filterSelectedOptionsFromRoute = this.getFilterSelectedOptionsFromRoute(filterOptions, this.props.match.params.tripTypeName, this.props.match.params.teamName);

            if (filterSelectedOptionsFromRoute === undefined) {
                this.setState({ isInvalidRoute: true })
                return;
            }

            this.setState({ filterOptions: filterOptions, tripType: (filterSelectedOptionsFromRoute.tripType), team: filterSelectedOptionsFromRoute.team });
        } else {
            toastr.error('Sorry, can\'t request photos without the filter options.', '', ErrorHelpers.GetToastrOptions());
            return;
        }

        let photosFromRouteValues: IPhoto[] = InitialState.Pages().photos;
        try {
            photosFromRouteValues = await this.getPhotos(filterSelectedOptionsFromRoute.tripType.value, filterSelectedOptionsFromRoute.team.value);
        } catch(error) {
            toastr.error('Sorry, there was an error retrieving the photos.', '', ErrorHelpers.GetToastrOptions());
            return;
        }
        
        const totalPages = GalleryHelpers.CalculateTotalPages(photosFromRouteValues.length, this.state.pageSize);

        const pageFromRouteValues: number = Number(this.props.match.params.pageNumber);

        let pageIndex: number;

        if (Number.isNaN(pageFromRouteValues)) {
            if (this.props.location.pathname === process.env.REACT_APP_GALLERY_ROOT_PATH) {
                pageIndex = 0;
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
            pageIndex = pageFromRouteValues - 1;
        }
        
        let route:string = this.updateGalleryRoute(filterSelectedOptionsFromRoute.tripType.value, filterSelectedOptionsFromRoute.team.value, pageIndex);

        this.setState({ arePhotosLoading: false, pageCount: totalPages, pageIndex: pageIndex, photos: photosFromRouteValues, photosDisplayType: PhotosDisplayType.Thumbnails, route: route }, () => {
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
                            options = {this.state.filterOptions}
                            onTripTypeChange={this.handleTripTypeChange}
                            onTeamChange={this.handleTeamChange}
                            onSubmit={this.handleSearchClicked}
                            />
                    </div>

                    <div className="container">

                        {this.state.arePhotosLoading ? 
                        (<h2 className="mx-auto">Loading Photos...</h2>) :
                        (<div>
                                <p className="w-100 text-center mb-3">{ this.props.filter.message }</p>

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

                                <ThumbnailGrid page={this.state.pageIndex} pageSize={this.state.pageSize} photos={this.state.photos} onPageChange={this.handleThumbnailClick} />
                        </div>)}
                    </div>

                </div>
            );

        }
    }
}

const mapStateToProps = (state: AppState) => ({
    metaData: state.metaData,
    filter: state.filter,
    photos: state.pages
});

const mapDispatchToProps = { searchClicked, pagingClicked, filterChanged, galleryLoaded }

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (Gallery);
