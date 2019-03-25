import React from 'react';

import { ISelectOption } from './ISelectOption';

const tripTypesOptions: ISelectOption[] = [
	{
		text: "All",
		value: 0
	}, 
	{
		text: "Backpacking",
		value: 20
	}, 
	{
		text: "Beach Walk",
		value: 22
	}, 
	{
		text: "Bicycling",
		value: 2
	}, 
	{
		text: "Bird Watching",
		value: 3
	}, 
	{
		text: "Canoeing",
		value: 4
	}, 
	{
		text: "Car Camping",
		value: 5
	}, 
	{
		text: "Community Service",
		value: 16
	}, 
	{
		text: "Corn Maze",
		value: 21
	}, 
	{
		text: "Earth Day",
		value: 23
	}, 
	{
		text: "Educational",
		value: 6
	}, 
	{
		text: "Farm Visit",
		value: 7
	}, 
	{
		text: "Fishing / Shellfishing",
		value: 26
	}, 
	{
		text: "Geocache",
		value: 18
	}, 
	{
		text: "Hiking",
		value: 8
	}, 
	{
		text: "Horseback Riding",
		value: 19
	}, 
	{
		text: "Kayaking",
		value: 10
	}, 
	{
		text: "Other",
		value: 1
	}, 
	{
		text: "Sailing",
		value: 9
	}, 
	{
		text: "Skiing / Snowboarding",
		value: 12
	}, 
	{
		text: "Skiing- X-country",
		value: 11
	}, 
	{
		text: "Snow Camping",
		value: 15
	}, 
	{
		text: "Snow Shoeing",
		value: 14
	}, 
	{
		text: "Snow Sledding",
		value: 13
	}, 
	{
		text: "Surfing",
		value: 25
	}, 
	{
		text: "Tree Planting",
		value: 24
	}, 
	{
		text: "Whitewater Rafting",
		value: 17
	} 
];

const teamsOptions: ISelectOption[] = [
  {
    text: "All",
    value: 0
  },
  {
    text: "Cleveland",
    value: 18
  },
  {
    text: "EYES",
    value: 4
  }, 
  {
    text: "Franklin",
    value: 5
  }, 
  {
    text: "Gatzert",
    value: 14
  }, 
  {
    text: "Hale",
    value: 6
  }, 
  {
    text: "Hamilton",
    value: 7
  }, 
  {
    text: "Madrona",
    value: 9
  }, 
  {
    text: "Mercer",
    value: 10
  },
  {
    text: "PSKS",
    value: 16
  }, 
  {
    text: "Rainier Beach",
    value: 19
  }, 
  {
    text: "Showalter",
    value: 20
  }, 
  {
    text: "South Shore",
    value: 24
  }, 
  {
    text: "Stevens",
    value: 12
  }, 
  {
    text: "Tukwila",
    value: 17
  }, 
  {
    text: "Washington",
    value: 21
  } 
];

interface IFilterProps {
}

interface IFilterState {
  selectedTeam: number,
  selectedTripType: number
}

class Filter extends React.Component<IFilterProps, IFilterState> {
  constructor(props: IFilterProps) {
    super(props);
    this.state = {selectedTeam: 0, selectedTripType: 0};

    this.handleTripTypeChange = this.handleTripTypeChange.bind(this);
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTeamChange(event: any) {
    this.setState({ selectedTeam: Number(event.target.value) });
  }

  handleTripTypeChange(event: any){
    this.setState({ selectedTripType: Number(event.target.value) });
  }

  handleSubmit(event: any) {
    event.preventDefault();
    console.log('Selected Team is: ' + this.state.selectedTeam);
    console.log('Selected Trip Type is: ' + this.state.selectedTripType)
  }

  render() {

    return (
        <div className="container mb-2">

        <div className="row">
      
          <div className="col-11 col-sm-12 mx-auto">
      
            <form className="form-inline justify-content-center" onSubmit={this.handleSubmit}>
      
              <div className="form-group col-12 mb-1 col-sm-6 px-sm-0 col-md-4 col-lg-3 col-xl-2">
                  <label htmlFor="tripTypes" className="small">Trip Type:</label>
                  <select name="tripTypes" className="form-control" value={this.state.selectedTripType} onChange={this.handleTripTypeChange}>
                    {tripTypesOptions.map(tt => (
                        <option key={tt.value} value={tt.value}>{tt.text}</option>
                    ))}
                  </select>
              </div>

              <div className="form-group col-12 mb-3 col-sm-4 pt-sm-2 px-sm-0 col-md-3 px-lg-4 col-xl-2">
                  <label htmlFor="teams" className="small">Teams:</label>
                  <select name="teams" className="form-control" value={this.state.selectedTeam} onChange={this.handleTeamChange}>
                    {teamsOptions.map(t => (
                        <option key={t.value} value={t.value}>{t.text}</option>
                    ))}
                  </select>
              </div>
      
              <div className="form-group col-12 mb-0 col-sm-2 pt-sm-2 px-sm-0 col-lg-1">
                  <button type="submit" className="btn btn-primary">Search</button>
              </div>
      
            </form>
      
          </div>
      
        </div>
      
      </div>
    );
  }
}

export default Filter;