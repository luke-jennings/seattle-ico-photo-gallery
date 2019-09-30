import { metaDataReducer, pagesReducer, filtersReducer } from './Reducers';
import { InitialState } from '../helpers/InitialState';
import { ReduxActionType } from '../enumerations/ReduxActionType';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { MetaDataActionTypes, PaginationActionTypes, FilterActionTypes } from './Types';
import { IGalleryState } from '../interfaces/IGalleryState';
import { PhotosDisplayType } from '../enumerations/PhotosDisplayType';
import { IPagesState } from '../interfaces/IPagesState';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import { IPhoto } from '../interfaces/IPhoto';
import { IFilterState } from '../interfaces/IFilterState';
import { IFilterOptions } from '../interfaces/IFilterOptions';
import { ISelectOption } from '../interfaces/ISelectOption';
import { GalleryHelpers } from '../helpers/GalleryHelpers';

const reduxInitAction: string = '@@INIT';
const expectedPhotos: IPhoto[] = [
{
    id: 1974,
    tripReportId: 900,
    tripReportRoute: 'south-shore-deception-pass-bridge-and-anacortes-sea-kayaking-900',
    destination: 'Deception Pass Bridge and Anacortes sea kayaking',
    team: 'South Shore',
    date: '2018-06-09T00:00:00',
    image: '/images/photos/900_20181211190714987.jpg',
    width: 650,
    height: 487,
    widthThumb: 120,
    heightThumb: 90,
    caption: 'We spent the afternoon sea kayaking with Anacortes Kayak Tours in the waters off of Anacortes. We started the trip from Skyline Marina in Anacortes.'
  },
  {
    id: 1975,
    tripReportId: 900,
    tripReportRoute: 'south-shore-deception-pass-bridge-and-anacortes-sea-kayaking-900',
    destination: 'Deception Pass Bridge and Anacortes sea kayaking',
    team: 'South Shore',
    date: '2018-06-09T00:00:00',
    image: '/images/photos/900_20181211190814957.jpg',
    width: 487,
    height: 650,
    widthThumb: 90,
    heightThumb: 120,
    caption: 'In the morning on our way to Anacortes we stopped off at Deception Pass to take in the views.'
  },
  {
    id: 1976,
    tripReportId: 900,
    tripReportRoute: 'south-shore-deception-pass-bridge-and-anacortes-sea-kayaking-900',
    destination: 'Deception Pass Bridge and Anacortes sea kayaking',
    team: 'South Shore',
    date: '2018-06-09T00:00:00',
    image: '/images/photos/900_20181211190917177.jpg',
    width: 650,
    height: 487,
    widthThumb: 120,
    heightThumb: 90,
    caption: 'Always worth a stop, the views from the Deception Pass bridge are really good.'
}];

describe("The Redux Reducer metaDataReducer", () => {

    const expectedRoute: string = '/some/test/route';
    const expectedArePhotosLoading: boolean = false;
    const expectedPhotosDisplayType: PhotosDisplayType = PhotosDisplayType.Thumbnails;
    const expectedMetaData: IMetaDataState = { isInvalidRoute: true, arePhotosLoading: expectedArePhotosLoading, photosDisplayType: expectedPhotosDisplayType, route: expectedRoute };

    it(`Action type ${reduxInitAction} returns state with no change.`, () => {
        
        // Arrange
        const action: MetaDataActionTypes = { type: reduxInitAction };

        // Act
        const newMetaDataState = metaDataReducer(undefined, action);

        // Assert
        expect(newMetaDataState).toEqual(InitialState.MetaData());
    });

    it('Action type LOAD_GALLERY_FROM_ROUTE returns expected state.', () => {
        
        // Arrange
        const payload: IGalleryState = { ...InitialState.Gallery(), ...expectedMetaData  };

        const action: MetaDataActionTypes = { type: ReduxActionType.LOAD_GALLERY_FROM_ROUTE, payload: payload };

        // Act
        const newMetaDataState: IMetaDataState = metaDataReducer(undefined, action);

        // Assert
        expect(newMetaDataState).toEqual(expectedMetaData);
    });

    it('Action type LOAD_SLIDESHOW_FROM_ROUTE returns expected state.', () => {
        
        // Arrange
        const payload: ISlideshowState = { ...InitialState.Slideshow(), ...expectedMetaData  };

        const action: MetaDataActionTypes = { type: ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE, payload: payload };

        // Act
        const newMetaDataState: IMetaDataState = metaDataReducer(undefined, action);

        // Assert
        expect(newMetaDataState).toEqual(expectedMetaData);
    });

    it('Action type CLICK_SEARCH returns expected state.', () => {
        
        // Arrange
        const payload: IGalleryState = { ...InitialState.Gallery(), ...expectedMetaData  };

        const action: MetaDataActionTypes = { type: ReduxActionType.CLICK_SEARCH, payload: payload };

        // Act
        const newMetaDataState: IMetaDataState = metaDataReducer(undefined, action);

        // Assert
        expect(newMetaDataState).toEqual(expectedMetaData);
    });

    it('Action type CLICK_PAGING returns expected state.', () => {
        
        // Arrange
        const payload: ISlideshowState = { ...InitialState.Slideshow(), route: expectedRoute  };

        const action: MetaDataActionTypes = { type: ReduxActionType.CLICK_PAGING, payload: payload };

        // Act
        const newMetaDataState: IMetaDataState = metaDataReducer(undefined, action);

        // Assert
        const expectedState: IMetaDataState = { ...InitialState.MetaData(), route: expectedRoute }
        expect(newMetaDataState).toEqual(expectedState);
    });

    it('Action type CLICK_THUMBNAIL returns expected state.', () => {
        
        // Arrange
        const payload: IGalleryState = { ...InitialState.Gallery(), arePhotosLoading: expectedArePhotosLoading, photosDisplayType: expectedPhotosDisplayType, route: expectedRoute  };

        const action: MetaDataActionTypes = { type: ReduxActionType.CLICK_THUMBNAIL, payload: payload };

        // Act
        const newMetaDataState: IMetaDataState = metaDataReducer(undefined, action);

        // Assert
        const expectedState: IMetaDataState = { ...InitialState.MetaData(), arePhotosLoading: expectedArePhotosLoading, photosDisplayType: expectedPhotosDisplayType, route: expectedRoute }
        expect(newMetaDataState).toEqual(expectedState);
    });

});

describe("The Redux Reducer pagesReducer", () => {

    const expectedPageCount: number = 2;
    const expectedPageIndex: number = 1;

    const expectedPagingState: IPagesState = { pageSize: 1, pageCount: expectedPageCount, pageIndex: expectedPageIndex, photos: expectedPhotos };

    it(`Action type ${reduxInitAction} returns state with no change.`, () => {
        
        // Arrange
        const action: PaginationActionTypes = { type: reduxInitAction };

        // Act
        const newPagesState: IPagesState = pagesReducer(undefined, action);

        // Assert
        expect(newPagesState).toEqual(InitialState.Pages());
    });

    it('Action type LOAD_GALLERY_FROM_ROUTE returns expected state.', () => {
        
        // Arrange
        const payload: IPagesState = { ...InitialState.Gallery(), ...expectedPagingState };

        const action: PaginationActionTypes = { type: ReduxActionType.LOAD_GALLERY_FROM_ROUTE, payload: payload };

        // Act
        const newPagesState: IPagesState = pagesReducer(undefined, action);

        // Assert
        expect(newPagesState).toEqual(expectedPagingState);
    });

    it('Action type LOAD_SLIDESHOW_FROM_ROUTE returns expected state.', () => {
        
        // Arrange
        const payload: IPagesState = { ...InitialState.Slideshow(), ...expectedPagingState };

        const action: PaginationActionTypes = { type: ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE, payload: payload };

        // Act
        const newPagesState: IPagesState = pagesReducer(undefined, action);

        // Assert
        expect(newPagesState).toEqual(expectedPagingState);
    });

    it('Action type CLICK_SEARCH returns expected state.', () => {
        
        // Arrange
        const payload: IPagesState = { ...InitialState.Gallery(), pageCount: expectedPageCount, pageIndex: expectedPageIndex, photos: expectedPhotos };

        const action: PaginationActionTypes = { type: ReduxActionType.CLICK_SEARCH, payload: payload };

        // Act
        const newPagesState: IPagesState = pagesReducer(undefined, action);

        // Assert
        const expectedState: IPagesState = { ...InitialState.Pages(), pageCount: expectedPageCount, pageIndex: expectedPageIndex, photos: expectedPhotos };
        expect(newPagesState).toEqual(expectedState);
    });

    it('Action type CLICK_PAGING returns expected state.', () => {
        
        // Arrange
        const payload: IPagesState = { ...InitialState.Gallery(), pageIndex: expectedPageIndex };

        const action: PaginationActionTypes = { type: ReduxActionType.CLICK_PAGING, payload: payload };

        // Act
        const newPagesState: IPagesState = pagesReducer(undefined, action);

        // Assert
        const expectedState: IPagesState = { ...InitialState.Pages(), pageIndex: expectedPageIndex };
        expect(newPagesState).toEqual(expectedState);
    });

});

describe("The Redux Reducer filtersReducer", () => {

    const expectedFilterOptions: IFilterOptions = {
                                                    tripTypeOptions:
                                                    [{
                                                        text: 'All',
                                                        value: 0,
                                                        routeName: 'trip-types-all'
                                                    },
                                                    {
                                                      text: 'Kayaking',
                                                      value: 10,
                                                      routeName: 'kayaking'
                                                    }],
                                                    teamOptions:
                                                    [{
                                                        text: 'All',
                                                        value: 0,
                                                        routeName: 'teams-all'
                                                    },
                                                    {
                                                      text: 'Rainier Beach',
                                                      value: 19,
                                                      routeName: 'rainier-beach'
                                                    }]
                                                };

    const expectedTripTypeSelection: ISelectOption = {
                                                        value: 10,
                                                        text: 'Kayaking'
                                                    };

    const expectedTeamSelection: ISelectOption = {
                                                    value: 19,
                                                    text: 'Rainier Beach'
                                                };

    it(`Action type ${reduxInitAction} returns state with no change.`, () => {
        
        // Arrange
        const action: FilterActionTypes = { type: reduxInitAction };

        // Act
        const newFilterState: IFilterState = filtersReducer(undefined, action);

        // Assert
        expect(newFilterState).toEqual(InitialState.Filters());
    });

    it('Action type LOAD_GALLERY_FROM_ROUTE returns expected state.', () => {
    
        const galleryState: IGalleryState = { ...InitialState.Gallery(), photos: expectedPhotos, filterOptions: expectedFilterOptions, tripType: expectedTripTypeSelection, team: expectedTeamSelection };

        // Arrange
        const payload: IFilterState = { ...galleryState };

        const action: FilterActionTypes = { type: ReduxActionType.LOAD_GALLERY_FROM_ROUTE, payload: payload };

        const expectedMessage: string = GalleryHelpers.GetFilterMessage(action.payload);

        // Act
        const newPagesState: IFilterState = filtersReducer(undefined, action);

        // Assert
        const expectedState: IFilterState = { filterOptions: expectedFilterOptions, tripType: expectedTripTypeSelection, team: expectedTeamSelection, message: expectedMessage };
        expect(newPagesState).toEqual(expectedState);
    });

    it('Action type LOAD_SLIDESHOW_FROM_ROUTE returns expected state.', () => {
    
        // Arrange
        const payload: IFilterState = { ...InitialState.Slideshow(), ...InitialState.Filters() };

        const action: FilterActionTypes = { type: ReduxActionType.LOAD_SLIDESHOW_FROM_ROUTE, payload: payload };

        // Act
        const newPagesState: IFilterState = filtersReducer(undefined, action);

        // Assert
        expect(newPagesState).toEqual(InitialState.Filters());
    });

    it('Action type CLICK_SEARCH returns expected state.', () => {
    
        // Arrange
        const payload: IFilterState = { ...InitialState.Gallery(), tripType: expectedTripTypeSelection, team: expectedTeamSelection };

        const action: FilterActionTypes = { type: ReduxActionType.CLICK_SEARCH, payload: payload };

        const expectedMessage: string = GalleryHelpers.GetFilterMessage(action.payload);

        // Act
        const newPagesState: IFilterState = filtersReducer(undefined, action);

        // Assert
        const expectedState: IFilterState = { ...InitialState.Filters(), message: expectedMessage };
        expect(newPagesState).toEqual(expectedState);
    });

    it('Action type CHANGE_FILTER returns expected state.', () => {
    
        // Arrange
        const payload: IFilterState = { ...InitialState.Gallery(), tripType: expectedTripTypeSelection, team: expectedTeamSelection };

        const action: FilterActionTypes = { type: ReduxActionType.CHANGE_FILTER, payload: payload };

        // Act
        const newPagesState: IFilterState = filtersReducer(undefined, action);

        // Assert
        const expectedState: IFilterState = { ...InitialState.Filters(), tripType: expectedTripTypeSelection, team: expectedTeamSelection };
        expect(newPagesState).toEqual(expectedState);
    });

});