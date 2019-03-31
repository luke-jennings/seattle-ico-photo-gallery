import React, { ChangeEvent } from 'react';

import { ISelectOption } from './interfaces/ISelectOption';

interface ISelectProps {
    labelText: string;
    selectName: string;
    options: ISelectOption[];
    selectedValue: number;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

class Select extends React.Component<ISelectProps> {
    constructor(props: ISelectProps) {
      super(props);
    }

    public render() {
        return (
            <>
                <label htmlFor={this.props.selectName} className="small">{this.props.labelText}:</label>
                <select name={this.props.selectName} className="form-control" value={this.props.selectedValue} onChange={this.props.onChange}>
                    {this.props.options.map(o => (
                        <option key={o.value} value={o.value}>{o.text}</option>
                    ))}
                </select>
            </>
        );
    }
}

export default Select;