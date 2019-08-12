import { RouteComponentProps } from 'react-router-dom'
import { slideshowLoaded, pagingClicked } from '../store/Actions';
import { TSlideshowRouteValues } from '../types/TSlideshowRouteValues';

export interface ISlideshowProps extends RouteComponentProps<TSlideshowRouteValues> {
    slideshowLoaded: typeof slideshowLoaded;
    pagingClicked: typeof pagingClicked;
}