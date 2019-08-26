import { IFilterSelectedOptionsState } from './IFilterSelectedOptionsState';
import { IFilterOptions } from './IFilterOptions';

export interface IFilterState extends IFilterSelectedOptionsState {
    filterOptions: IFilterOptions;
    message: string;
}