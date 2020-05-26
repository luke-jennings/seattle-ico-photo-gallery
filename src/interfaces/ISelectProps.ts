import { ChangeEvent } from 'react';
import ISelectOption from './ISelectOption';

interface ISelectProps {

    labelText: string;

    selectName: string;

    options: ISelectOption[];

    selectedValue: number;
    
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default ISelectProps;