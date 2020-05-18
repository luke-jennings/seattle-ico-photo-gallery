import React from 'react';
import { ISelectProps } from '../interfaces/ISelectProps';

const Select = (props: ISelectProps): JSX.Element => {

    return (
        <React.Fragment>
            <label htmlFor={props.selectName} className="small mb-1">{props.labelText}</label>
            <select id={props.selectName} name={props.selectName} className="form-control" value={props.selectedValue} onChange={props.onChange}>
                {props.options.map(o => { return <option key={o.value} value={o.value}>{o.text}</option>; } )}
            </select>
        </React.Fragment>
    );
};

export default Select;