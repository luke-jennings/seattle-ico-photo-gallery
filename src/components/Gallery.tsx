import React, { ChangeEvent } from 'react';
import Filter from './Filter'
import Photo from './Photo';

import { IFilterValues } from '../interfaces/IFilterValues';
import { IFilterOptions } from '../interfaces/IFilterOptions';
import { Data } from '../services/Data';
import { ISelectOption } from '../interfaces/ISelectOption';
import { IPhoto } from '../interfaces/IPhoto';

interface IGalleryProps {
}

interface IGalleryState extends IFilterValues {
    isLoading: boolean;
}

class Gallery extends React.Component<IGalleryProps, IGalleryState> {

    filterOptions: IFilterOptions;
    photos: IPhoto[];
    columns: number;
    rows: number;
    data: number[][];

    constructor(props: IGalleryProps) {
        super(props);
        this.state = {tripType: { value: 0, text: 'All' }, team: { value: 0, text: 'All' }, isLoading: true };
        this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.updateStateFromFilter = this.updateStateFromFilter.bind(this);
        this.filterOptions = { tripTypeOptions: [], teamOptions: [] };
        this.photos = [];
        this.columns = 4;
        this.rows = 0;
        this.data = [];
    }

    handleTripTypeChange(event: ChangeEvent<HTMLSelectElement>) {

        let tripTypeSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text }

        this.setState({ tripType: tripTypeSelected });
    }
    
    handleTeamChange(event: ChangeEvent<HTMLSelectElement>) {

        let teamSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text }

        this.setState({ team: teamSelected });
    }

    updateStateFromFilter() {
        console.log('Selected Trip Type is: ' + this.state.tripType.text + ' (' + this.state.tripType.value + ')');
        console.log('Selected Team is: ' + this.state.team.text + ' (' + this.state.team.value + ')');
    }

    async componentDidMount() {
        let data = new Data();
        this.filterOptions = await new Promise((resolve) => setTimeout(resolve, 1000, data.GetFilterOptions()));
        this.photos = data.GetPhotos();
        this.rows = Math.ceil((this.photos.length / this.columns));
        let matrix: number[][] =[];
        let row;
        for(var i=0;i<this.rows;i++){
          row=[];
          for(var j=0;j<this.columns;j++){
            let index = this.columns * i + j;
            row.push(index) // ${i}${j} index = ${index < this.photos.length ? index : -1 }
          }
          matrix.push(row);
        }
        this.data = matrix;
        this.setState({ isLoading: false })
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

                        <p className="w-100 text-center mb-5">{ this.photos.length } photos of type <em>{ this.state.tripType.text }</em> and team <em>{ this.state.team.text }</em>.</p>
                        {
                            this.data.map((row, index) => (
                            <div key={`row${row[0]}`} className="row justify-content-center mb-4">
                                {row.map((photoIndex) => photoIndex < this.photos.length ? <Photo photo={this.photos[photoIndex]} key={photoIndex} /> : <div key={photoIndex} className="col-6 col-sm-6 col-md-3 col-lg-2 mb-3">&#160;</div>)}
                            </div>
                            ))
                        }
                    </div>
                </>
            );
        }
    }
}

export default Gallery;
