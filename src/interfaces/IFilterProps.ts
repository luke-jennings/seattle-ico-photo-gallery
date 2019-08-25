import { FormEvent, ChangeEvent } from 'react';
import { IFiltersSelectedState } from './IFiltersSelectedState';
import { IFilterOptions } from './IFilterOptions';

export interface IFilterProps {
    values: IFiltersSelectedState;
    options: IFilterOptions;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onTripTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onTeamChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}