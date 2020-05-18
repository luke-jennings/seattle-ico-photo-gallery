import { FormEvent, ChangeEvent } from 'react';
import { IFilterOptions } from './IFilterOptions';
import { IFilterSelectedOptionsState } from './IFilterSelectedOptionsState';

export interface IFilterProps {

    values: IFilterSelectedOptionsState;

    options: IFilterOptions;

    onSubmit: (event: FormEvent<HTMLFormElement>) => void;

    onTripTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    
    onTeamChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}