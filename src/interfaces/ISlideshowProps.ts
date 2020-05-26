import { RouteComponentProps } from 'react-router-dom';
import { slideshowLoaded, pagingClicked, invalidRoute } from '../store/Actions';
import TSlideshowRouteValues from '../types/TSlideshowRouteValues';
import ISlideshowState from './ISlideshowState';

interface ISlideshowProps extends RouteComponentProps<TSlideshowRouteValues>, ISlideshowState {

    // Actions
    slideshowLoaded: typeof slideshowLoaded;

    pagingClicked: typeof pagingClicked;

    invalidRoute: typeof invalidRoute;
}

export default ISlideshowProps;