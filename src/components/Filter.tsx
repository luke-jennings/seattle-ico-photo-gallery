import React from 'react';

import { IFilterProps } from '../interfaces/IFilterProps';

import Select from './Select';

const Filter = (props: IFilterProps): JSX.Element => {

  if (props.options.tripTypeOptions.length > 0 && props.options.teamOptions.length > 0) {

    return (
    
        <div className="col-11 col-sm-12 mx-auto">
      
          <form className="form-inline justify-content-center" onSubmit={props.onSubmit}>
    
            <div className="form-group text-left col-12 mb-1 col-sm-6 px-sm-2 col-md-4 col-lg-3 pl-xl-4 pr-xl-3">
                <Select labelText="Trip Type" selectName="tripTypes" selectedValue={props.values.tripType.value} options={props.options.tripTypeOptions} onChange={props.onTripTypeChange}  />
            </div>

            <div className="form-group text-left col-12 mb-3 col-sm-4 pt-sm-2 px-sm-2 col-md-3 col-lg-2 mr-lg-3 mx-xl-0 pl-xl-0 pr-xl-5">
                <Select labelText="Teams" selectName="teams" selectedValue={props.values.team.value} options={props.options.teamOptions} onChange={props.onTeamChange}  />
            </div>
    
            <div className="form-group text-left col-12 mb-3 mb-sm-0 col-sm-2 pt-sm-2 px-sm-0 col-lg-1">
                <button id="btnSubmit" type="submit" className="btn btn-primary">Search</button>
            </div>
    
          </form>
    
        </div>
    );

  } else {

    return (
        <h2 className="mx-auto">Loading Filters...</h2>
    );

  }
};

export default Filter;