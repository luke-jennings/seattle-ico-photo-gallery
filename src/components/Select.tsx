import React from 'react';

import { ISelectProps } from '../interfaces/ISelectProps';

class Select extends React.Component<ISelectProps> {
    constructor(props: ISelectProps) {
      super(props);
    }

    public render() {
        return (
            <>
                <label htmlFor={this.props.selectName} className="small">{this.props.labelText}</label>
                <select id={this.props.selectName} name={this.props.selectName} className="form-control" value={this.props.selectedValue} onChange={this.props.onChange}>
                    {this.props.options.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                    ))}
                </select>
            </>
        );
    }
}

export default Select;