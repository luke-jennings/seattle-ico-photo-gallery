import { ChangeEvent } from 'react';
import { IFiltersSelectedState } from './IFiltersSelectedState';
import { IFilterOptions } from './IFilterOptions';

export interface IFilterProps {
    values: IFiltersSelectedState;
    options: IFilterOptions;
    onSubmit: () => void;
    onTripTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onTeamChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}