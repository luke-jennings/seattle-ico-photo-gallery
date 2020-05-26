import IFilterSelectedOptionsState from './IFilterSelectedOptionsState';
import IFilterOptions from './IFilterOptions';

interface IFilterState extends IFilterSelectedOptionsState {

    filterOptions: IFilterOptions;

    message: string;
}

export default IFilterState;