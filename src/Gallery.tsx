import React, { ChangeEvent } from 'react';
import Filter from './Filter'

import { IFilterValues } from './interfaces/IFilterValues';
import { IFilterOptions } from './interfaces/IFilterOptions';
import { Api } from './services/Api';

interface IGalleryProps {
}

interface IGalleryState extends IFilterValues {
    isLoading: boolean;
}

class Gallery extends React.Component<IGalleryProps, IGalleryState> {

    filterOptions: IFilterOptions;

    constructor(props: IGalleryProps) {
        super(props);
        this.state = {tripTypeId: 0, teamId: 0, isLoading: true };
        this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.updateStateFromFilter = this.updateStateFromFilter.bind(this);
        this.filterOptions = { tripTypeOptions: [], teamOptions: [] };
    }

    handleTripTypeChange(event: ChangeEvent<HTMLSelectElement>){
        this.setState({ tripTypeId: Number(event.target.value) });
    }
    
    handleTeamChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({ teamId: Number(event.target.value) });
    }

    updateStateFromFilter() {
        console.log('Selected Trip Type is: ' + this.state.tripTypeId);
        console.log('Selected Team is: ' + this.state.teamId);
    }

    async componentDidMount() {
        let api = new Api();
        this.filterOptions = await new Promise((resolve) => setTimeout(resolve, 1000, api.GetFilterOptions()));
        this.setState({ isLoading: false })
    }

    render() {
        if (this.state.isLoading) {
            return (<div className="row"><h3 className="mx-auto">Loading...</h3></div>);
        } else {
            return (
                <div className="row">
                    <Filter
                        values={{ tripTypeId: this.state.tripTypeId, teamId: this.state.teamId}}
                        options = {this.filterOptions}
                        onTripTypeChange={this.handleTripTypeChange}
                        onTeamChange={this.handleTeamChange}
                        onSubmit={this.updateStateFromFilter}
                        />
                </div>
            );
        }
    }
}

export default Gallery;
