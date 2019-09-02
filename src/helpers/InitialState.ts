import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IFilterState } from "../interfaces/IFilterState";
import { IPagesState } from '../interfaces/IPagesState';
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';
import { ISelectOption } from '../interfaces/ISelectOption';
import { IGalleryState } from '../interfaces/IGalleryState';
import { ISlideshowState } from '../interfaces/ISlideshowState';

export class InitialState {

    private static initialMetaDataState: IMetaDataState = {
        isInvalidRoute: false,
        arePhotosLoading: true,
        photosDisplayType: PhotosDisplayType.NotSet,
        route: '/'
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

    public static Filters() : IFilterState {

        return this.initialFilterState;
    }

    public static Pages(): IPagesState {

        return this.initialPagesState;
    }

    public static Gallery(): IGalleryState {
        
        let pageSize: number = Number(process.env.REACT_APP_GALLERY_PAGE_SIZE);

        let galleryState: IGalleryState = { ...this.initialMetaDataState, ...this.initialFilterState, ...this.initialPagesState }

        galleryState.pageSize = pageSize;

        return galleryState;
    }

    public static Slideshow(): ISlideshowState {
        
        let slideshowState: ISlideshowState = { ...this.initialMetaDataState, ...this.initialPagesState };

        slideshowState.pageSize = 1;

        return slideshowState;
    }
}