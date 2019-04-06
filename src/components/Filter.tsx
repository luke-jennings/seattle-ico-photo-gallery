import React, { FormEvent } from 'react';

import { IFilterProps } from '../interfaces/IFilterProps';

import Select from './Select';

interface IFilterState {
  isLoading: boolean;
}

class Filter extends React.Component<IFilterProps, IFilterState> {
  constructor(props: IFilterProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.onSubmit();
  }

  render() {
    
    return (
    
      <div className="col-11 col-sm-12 mx-auto">
    
        <form className="form-inline justify-content-center" onSubmit={this.handleSubmit}>
  
          <div className="form-group col-12 mb-1 col-sm-6 px-sm-0 col-md-4 col-lg-3 col-xl-2">
              <Select labelText="Trip Type" selectName="tripTypes" selectedValue={this.props.values.tripTypeId} options={this.props.options.tripTypeOptions} onChange={this.props.onTripTypeChange}  />
          </div>

          <div className="form-group col-12 mb-3 col-sm-4 pt-sm-2 px-sm-0 col-md-3 px-lg-4 col-xl-2">
              <Select labelText="Teams" selectName="teams" selectedValue={this.props.values.teamId} options={this.props.options.teamOptions} onChange={this.props.onTeamChange}  />
          </div>
  
          <div className="form-group col-12 mb-0 col-sm-2 pt-sm-2 px-sm-0 col-lg-1">
              <button id="btnSubmit" type="submit" className="btn btn-primary">Search</button>
          </div>
  
        </form>
  
      </div>
    );
  }
}

export default Filter;