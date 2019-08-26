import { ISlideshowState } from './ISlideshowState';
import { IFilterState } from './IFilterState';

export interface IGalleryState extends IFilterState, ISlideshowState {
}