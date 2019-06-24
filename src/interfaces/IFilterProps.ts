import { ChangeEvent } from 'react';
import { IFilterState } from './IFilterState';
import { IFilterOptions } from './IFilterOptions';

export interface IFilterProps {
    values: IFilterState;
    options: IFilterOptions;
    onSubmit: () => void;
    onTripTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onTeamChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}