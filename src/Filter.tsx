import React, { FormEvent, ChangeEvent } from 'react';

import { IFilterValues } from './interfaces/IFilterValues';
import { ISelectOption } from './interfaces/ISelectOption';
import Select from './Select';

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
  values: IFilterValues;
  onSubmit: () => void;
  onTripTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onTeamChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface IFilterState extends IFilterValues {
}

class Filter extends React.Component<IFilterProps, IFilterState> {
  constructor(props: IFilterProps) {
    super(props);

    this.state = {tripTypeId: 0, teamId: 0};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {

    return (
        <div className="container mb-2">

        <div className="row">
      
          <div className="col-11 col-sm-12 mx-auto">
      
            <form className="form-inline justify-content-center" onSubmit={this.handleSubmit}>
      
              <div className="form-group col-12 mb-1 col-sm-6 px-sm-0 col-md-4 col-lg-3 col-xl-2">
                  <Select labelText="Trip Type" selectName="tripTypes" selectedValue={this.props.values.tripTypeId} options={tripTypesOptions} onChange={this.props.onTripTypeChange}  />
              </div>

              <div className="form-group col-12 mb-3 col-sm-4 pt-sm-2 px-sm-0 col-md-3 px-lg-4 col-xl-2">
                  <Select labelText="Teams" selectName="teams" selectedValue={this.props.values.teamId} options={teamsOptions} onChange={this.props.onTeamChange}  />
              </div>
      
              <div className="form-group col-12 mb-0 col-sm-2 pt-sm-2 px-sm-0 col-lg-1">
                  <button id="btnSubmit" type="submit" className="btn btn-primary">Search</button>
              </div>
      
            </form>
      
          </div>
      
        </div>
      
      </div>
    );
  }
}

export default Filter;