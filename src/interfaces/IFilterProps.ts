import { ChangeEvent } from 'react';
import { IFilterValues } from './IFilterValues';
import { IFilterOptions } from './IFilterOptions';

export interface IFilterProps {
    values: IFilterValues;
    options: IFilterOptions;
    onSubmit: () => void;
    onTripTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onTeamChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}