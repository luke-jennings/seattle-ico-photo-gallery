import { IFiltersSelectedState } from './IFiltersSelectedState'

export interface IFilterState extends IFiltersSelectedState {
    areFiltersLoading: boolean;
}