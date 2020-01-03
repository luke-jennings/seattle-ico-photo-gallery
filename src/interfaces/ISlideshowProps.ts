import { RouteComponentProps } from 'react-router-dom'
import { slideshowLoaded, pagingClicked } from '../store/Actions';
import { TSlideshowRouteValues } from '../types/TSlideshowRouteValues';
import { ISlideshowState } from './ISlideshowState';

export interface ISlideshowProps extends RouteComponentProps<TSlideshowRouteValues>, ISlideshowState {

    // Actions
    slideshowLoaded: typeof slideshowLoaded;
    pagingClicked: typeof pagingClicked;
}