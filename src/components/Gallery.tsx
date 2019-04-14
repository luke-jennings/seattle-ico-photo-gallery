import React, { ChangeEvent } from 'react';
import Filter from './Filter'
import PhotoGrid from './PhotoGrid';
import FilterMessage from './FilterMessage';

import ReactPaginate from 'react-paginate';

import { IFilterValues } from '../interfaces/IFilterValues';
import { IFilterOptions } from '../interfaces/IFilterOptions';
import { Data } from '../services/Data';
import { ISelectOption } from '../interfaces/ISelectOption';
import { IPhoto } from '../interfaces/IPhoto';

interface IGalleryState extends IFilterValues {
    isLoading: boolean;
    pageCount: number;
    selectedPage: number;
    photos: IPhoto[];
}

class Gallery extends React.Component<{}, IGalleryState> {

    filterOptions: IFilterOptions;
    // filterOptionSelected is a property that duplicates the IFilterValues in state, but this is done so that updating the state of a
    // filter does not automatically update the filter message (which should not be updated until the user clicks the Search button)
    filterOptionsSelected: IFilterValues;
    
    readonly pageSize: number = 12;

    constructor(props: {}) {
        super(props);
        this.state = {tripType: { value: 17, text: 'Whitewater Rafting' }, team: { value: 24, text: 'South Shore' }, isLoading: true, pageCount: 0, selectedPage: 0, photos: [] };
        this.filterOptionsSelected = { tripType: this.state.tripType, team: this.state.team }
        this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.updateStateFromFilter = this.updateStateFromFilter.bind(this);
        this.filterOptions = { tripTypeOptions: [], teamOptions: [] };
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
        console.log('Selected Trip Type is: ' + this.state.tripType.text + ' (' + this.state.tripType.value + ')');
        console.log('Selected Team is: ' + this.state.team.text + ' (' + this.state.team.value + ')');
        this.setState({ isLoading: true });
        await this.getPhotos();
        this.filterOptionsSelected = { tripType: this.state.tripType, team: this.state.team }
        this.setState({ selectedPage: 0, isLoading: false });
    }

    handlePageClick = (data: { selected: number }) => {
        this.setState({ selectedPage: data.selected })
    };

    async getPhotos() {
        let data = new Data();
        const photos = await data.GetPhotos(this.state.tripType.value, this.state.team.value);
        const totalPages = Math.ceil(photos.length/this.pageSize);
        this.setState({ pageCount: totalPages, photos: photos });
    }

    async componentDidMount() {
        let data = new Data();
        this.filterOptions = await data.GetFilterOptions();
        await this.getPhotos();
        this.setState({ isLoading: false });
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="row"><h3 className="mx-auto">Loading...</h3></div>);
        } else {
            return (
                <>
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
                            initialPage={0}
                            containerClassName={'pagination pagination-sm justify-content-center mb-4'}
                            activeClassName={'active'}
                            forcePage={this.state.selectedPage}
                        />

                        <PhotoGrid page={this.state.selectedPage} pageSize={this.pageSize} photos={this.state.photos} />

                    </div>
                </>
            );
        }
    }
}

export default Gallery;
