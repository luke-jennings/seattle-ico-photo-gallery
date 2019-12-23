import React from 'react';

import { ISelectProps } from '../interfaces/ISelectProps';

const Select = (props: ISelectProps) => {

    return (
        <>
            <label htmlFor={props.selectName} className="small mb-1">{props.labelText}</label>
            <select id={props.selectName} name={props.selectName} className="form-control" value={props.selectedValue} onChange={props.onChange}>
                {props.options.map(o => (
                    <option key={o.value} value={o.value}>{o.text}</option>
                ))}
            </select>
        </>
    );
}

export default Select;