import { FormEvent, ChangeEvent } from 'react';
import { IFilterSelectedOptionsState } from './IFilterSelectedOptionsState';
import { IFilterOptions } from './IFilterOptions';

export interface IFilterProps {
    values: IFilterSelectedOptionsState;
    options: IFilterOptions;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onTripTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onTeamChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}