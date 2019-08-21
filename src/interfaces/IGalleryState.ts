import { ISlideshowState } from './ISlideshowState';
import { IFiltersSelectedState } from './IFiltersSelectedState';

export interface IGalleryState extends IFiltersSelectedState, ISlideshowState {
}