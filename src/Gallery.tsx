import React, { ChangeEvent } from 'react';
import Filter from './Filter'

import { IFilterValues } from './interfaces/IFilterValues';

interface IGalleryProps {
}

interface IGalleryState extends IFilterValues {
}

class Gallery extends React.Component<IGalleryProps, IGalleryState> {

    constructor(props: IGalleryProps){
        super(props);
        this.state = {tripTypeId: 0, teamId: 0};
        this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.updateStateFromFilter = this.updateStateFromFilter.bind(this);
    }

    handleTripTypeChange(event: ChangeEvent<HTMLSelectElement>){
        this.setState({ tripTypeId: Number(event.target.value) });
    }
    
    handleTeamChange(event: ChangeEvent<HTMLSelectElement>) {
        this.setState({ teamId: Number(event.target.value) });
    }

    updateStateFromFilter() {
        console.log('[From Gallery*] Selected Trip Type is: ' + this.state.tripTypeId);
        console.log('[From Gallery*] Selected Team is: ' + this.state.teamId);
    }

    render() {
        return (
            <Filter values={{ tripTypeId: this.state.tripTypeId, teamId: this.state.teamId}} onTripTypeChange={this.handleTripTypeChange} onTeamChange={this.handleTeamChange} onSubmit={this.updateStateFromFilter} />
        );
    }
}

export default Gallery;
