import { ChangeEvent } from 'react';
import { ISelectOption } from './ISelectOption';

export interface ISelectProps {
    labelText: string;
    selectName: string;
    options: ISelectOption[];
    selectedValue: number;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}