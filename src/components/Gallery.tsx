import React, { ChangeEvent, MouseEvent } from 'react';

import Filter from './Filter'
import ThumbnailGrid from './ThumbnailGrid';
import FilterMessage from './FilterMessage';

import ReactPaginate from 'react-paginate';

import { IGalleryProps } from '../interfaces/IGalleryProps';
import { IGalleryState } from '../interfaces/IGalleryState';
import { IFilterValues } from '../interfaces/IFilterValues';
import { IFilterOptions } from '../interfaces/IFilterOptions';
import { Data } from '../services/Data';
import { ISelectOption } from '../interfaces/ISelectOption';
import { IPhoto } from '../interfaces/IPhoto';

class Gallery extends React.Component<IGalleryProps, IGalleryState> {

    filterOptions: IFilterOptions;
    // filterOptionSelected is a property that duplicates the IFilterValues in state, but this is done so that updating the state of a
    // filter does not automatically update the filter message (which should not be updated until the user clicks the Search button)
    filterOptionsSelected: IFilterValues;
    
    readonly pageSize: number = 12;

    constructor(props: IGalleryProps) {
        super(props);
        
        this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.updateStateFromFilter = this.updateStateFromFilter.bind(this);
        this.filterOptionsSelected = { tripType: {} as ISelectOption, team: {} as ISelectOption }
        this.filterOptions = { tripTypeOptions: [], teamOptions: [] };
        this.state = {tripType: {} as ISelectOption, team: {} as ISelectOption, isLoading: true, isInvalidRoute: false, pageCount: 0, selectedPage: 0, photos: [] };
    }

    handleTripTypeChange(event: ChangeEvent<HTMLSelectElement>) {

        let tripTypeSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text }

        this.setState({ tripType: tripTypeSelected });
    }
    
    handleTeamChange(event: ChangeEvent<HTMLSelectElement>) {

        let teamSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text }

        this.setState({ team: teamSelected });
    }

    async updateStateFromFilter() {
        
        this.setState({ isLoading: true });
        const photosFromFilter: IPhoto[] = await this.getPhotos(this.state.tripType.value, this.state.team.value);
        const totalPages = this.calculateTotalPages(photosFromFilter.length);
        this.filterOptionsSelected = { tripType: this.state.tripType, team: this.state.team }
        this.updateGalleryRoute(this.state.tripType.value, this.state.team.value, 0);
        this.setState({ photos: photosFromFilter, pageCount: totalPages, selectedPage: 0, isLoading: false });
    }

    updateGalleryRoute(tripTypeId: number, teamId: number, pageNumber: number) {
        const tripTypeRoute: string = this.filterOptions.tripTypeOptions.filter(tto => tto.value == tripTypeId)[0].routeName;
        const teamRoute: string = this.filterOptions.teamOptions.filter(to => to.value == teamId)[0].routeName;
        this.props.history.push('/what-we-do/photos/' + tripTypeRoute + '/' + teamRoute + '/' + (pageNumber + 1));
    }

    getFilterValuesFromRoute(tripTypeRouteName: string | undefined, teamRouteName: string | undefined): IFilterValues | undefined {

        if (tripTypeRouteName === undefined && teamRouteName === undefined) {
            return { tripType: { value: 0, text: 'All' }, team: { value: 0, text: 'All' } };
        }

        if (tripTypeRouteName === undefined || teamRouteName === undefined) {
            return undefined;
        }

        const tripTypeSelectOption: ISelectOption = this.filterOptions.tripTypeOptions.filter(tto => tto.routeName.toLowerCase() === tripTypeRouteName.toLowerCase())[0];
        const teamSelectOption: ISelectOption = this.filterOptions.teamOptions.filter(to => to.routeName.toLowerCase() == teamRouteName.toLowerCase())[0];

        if (tripTypeSelectOption !== undefined && teamSelectOption !== undefined) {
            return { tripType: tripTypeSelectOption, team: teamSelectOption };
        }

        return undefined;
    }

    handlePageClick = (data: { selected: number }) => {
        
        this.updateGalleryRoute(this.state.tripType.value, this.state.team.value, data.selected);
        this.setState({ selectedPage: data.selected })
    }

    handleThumbnailClick = (event: MouseEvent<HTMLAnchorElement>) => {
        
        const photoId: number = Number(event.currentTarget.id);

        const photo: IPhoto = this.state.photos.filter(p => p.id === photoId)[0];
        
        const photos: IPhoto[] = this.state.photos.filter(p => p.tripReportId === photo.tripReportId);

        const page: number = photos.indexOf(photo) + 1;

        this.props.history.push('/what-we-do/photo/' + photo.id + '/' + photo.tripReportRoute + '/' + page);
    }

    calculateTotalPages(numberOfPhotos: number): number {

        return Math.ceil(numberOfPhotos/this.pageSize)
    }

    async getPhotos(tripTypeId: number, teamId: number): Promise<IPhoto[]> {

        let data = new Data();
        const photos = await data.GetPhotos(tripTypeId, teamId);
        
        return photos;
    }
    
    async componentDidMount() {
        
        this.setState({ isLoading: true, isInvalidRoute: false });

        let data = new Data();
        this.filterOptions = await data.GetFilterOptions();

        const filterValuesFromRoute: IFilterValues | undefined = this.getFilterValuesFromRoute(this.props.match.params.tripTypeName, this.props.match.params.teamName);

        if (filterValuesFromRoute === undefined) {
            this.setState({ isInvalidRoute: true })
            return;
        }

        this.filterOptionsSelected = { tripType: filterValuesFromRoute.tripType, team: filterValuesFromRoute.team }

        const photosFromRouteValues = await this.getPhotos(filterValuesFromRoute.tripType.value, filterValuesFromRoute.team.value);
        
        const totalPages = this.calculateTotalPages(photosFromRouteValues.length);

        const pageFromRouteValues: number = Number(this.props.match.params.pageNumber);
        let page: number;

        if (Number.isNaN(pageFromRouteValues)) {
            page = 0;
        }
        else if (pageFromRouteValues > totalPages || pageFromRouteValues < 1) {
            this.setState({ isInvalidRoute: true })
            return;
        }
        else {
            page = pageFromRouteValues - 1;
        }

        this.setState({ tripType: filterValuesFromRoute.tripType, team: filterValuesFromRoute.team, isLoading: false, pageCount: totalPages, selectedPage: page, photos: photosFromRouteValues });
    }

    render() {
        
        if (this.state.isInvalidRoute === true) {
            return (
                <div className="App container mb-2">
                    <div className="row"><h2 className="mx-auto">Sorry, that is not a valid page.</h2></div>
                </div>);
        }

        if (this.state.isLoading) {
            return (
                <div className="App container mb-2">
                    <div className="row"><h2 className="mx-auto">Loading...</h2></div>
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

                        <FilterMessage photosCount={this.state.photos.length} tripTypeName={ this.filterOptionsSelected.tripType.text } teamName={ this.filterOptionsSelected.team.text } />

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

                        <ThumbnailGrid page={this.state.selectedPage} pageSize={this.pageSize} photos={this.state.photos} onPageChange={this.handleThumbnailClick} />

                    </div>
                </div>
            );
        }
    }
}

export default Gallery;
