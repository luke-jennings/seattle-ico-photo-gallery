import ISlideshowState from './ISlideshowState';
import IFilterState from './IFilterState';

interface IGalleryState extends IFilterState, ISlideshowState {
}

export default IGalleryState;