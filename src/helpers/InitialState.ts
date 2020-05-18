import { IFilterState } from '../interfaces/IFilterState';
import { IGalleryState } from '../interfaces/IGalleryState';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IPagesState } from '../interfaces/IPagesState';
import { ISelectOption } from '../interfaces/ISelectOption';
import { ISlideshowState } from '../interfaces/ISlideshowState';

export class InitialState {

    private static initialMetaDataState: IMetaDataState = {
        isInvalidRoute: false,
        arePhotosLoading: true,
        photosDisplayType: 'NotSet',
        route: '/',
        routeBackToGallery: null
    };

    private static initialFilterState: IFilterState = {
        filterOptions: { tripTypeOptions: [], teamOptions: [] },
        tripType: {} as ISelectOption,
        team: {} as ISelectOption,
        message: ''
    };

    private static initialPagesState: IPagesState = {
        pageSize: 0,
        pageCount: 0,
        pageIndex: 0,
        photos: []
    };

    public static MetaData(): IMetaDataState {

        return this.initialMetaDataState;
    }

    public static Filters(): IFilterState {

        return this.initialFilterState;
    }

    public static Pages(): IPagesState {

        return this.initialPagesState;
    }

    public static Gallery(): IGalleryState {
        
        const pageSize = Number(process.env.REACT_APP_GALLERY_PAGE_SIZE);

        const galleryState: IGalleryState = { ...this.initialMetaDataState, ...this.initialFilterState, ...this.initialPagesState };

        galleryState.pageSize = pageSize;
        galleryState.photosDisplayType = 'Thumbnails';

        return galleryState;
    }

    public static Slideshow(): ISlideshowState {

        const slideshowState: ISlideshowState = { ...this.initialMetaDataState, ...this.initialPagesState };

        slideshowState.pageSize = 1;
        slideshowState.photosDisplayType = 'Slideshow';

        return slideshowState;
    }
}
