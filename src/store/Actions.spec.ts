import { galleryLoaded, filterChanged, searchClicked, pagingClicked, thumbnailClicked, slideshowLoaded, invalidRoute } from './Actions';
import { InitialState } from '../helpers/InitialState';
import { IFilterSelectedOptionsState } from '../interfaces/IFilterSelectedOptionsState';
import { IGalleryState } from '../interfaces/IGalleryState';
import { IMetaDataState } from '../interfaces/IMetaDataState';
import { IReduxAction } from '../interfaces/IReduxAction';
import { ISlideshowState } from '../interfaces/ISlideshowState';
import TPhotosDisplay from '../types/TPhotosDisplay';

describe('The Redux Actions', () => {

    it('galleryLoaded returns expected type & payload.', () => {

        // Arrange
        const expectedState: IGalleryState = InitialState.Gallery();

        // Act
        const result: IReduxAction = galleryLoaded(expectedState);

        // Assert
        expect(result.type).toBe('LOAD_GALLERY_FROM_ROUTE');
        expect(result.payload).toBe(expectedState);
        expect(result.error).toBeUndefined();
        expect(result.meta).toBeUndefined();
    });

    it('filterChanged returns expected type & payload.', () => {

        // Arrange
        const expectedState: IFilterSelectedOptionsState = InitialState.Filters();

        // Act
        const result: IReduxAction = filterChanged(expectedState);

        // Assert
        expect(result.type).toBe('CHANGE_FILTER');
        expect(result.payload).toBe(expectedState);
        expect(result.error).toBeUndefined();
        expect(result.meta).toBeUndefined();
    });

    it('searchClicked returns expected type & payload.', () => {

        // Arrange
        const expectedState: IGalleryState = InitialState.Gallery();

        // Act
        const result: IReduxAction = searchClicked(expectedState);

        // Assert
        expect(result.type).toBe('CLICK_SEARCH');
        expect(result.payload).toBe(expectedState);
        expect(result.error).toBeUndefined();
        expect(result.meta).toBeUndefined();
    });

    it('pagingClicked returns expected type & payload.', () => {

        // Arrange
        const expectedState: ISlideshowState = InitialState.Slideshow();

        // Act
        const result: IReduxAction = pagingClicked(expectedState);

        // Assert
        expect(result.type).toBe('CLICK_PAGING');
        expect(result.payload).toBe(expectedState);
        expect(result.error).toBeUndefined();
        expect(result.meta).toBeUndefined();
    });

    it('thumbnailClicked returns expected type & payload.', () => {

        // Arrange
        const expectedState: IMetaDataState = InitialState.MetaData();

        // Act
        const result: IReduxAction = thumbnailClicked(expectedState);

        // Assert
        expect(result.type).toBe('CLICK_THUMBNAIL');
        expect(result.payload).toBe(expectedState);
        expect(result.error).toBeUndefined();
        expect(result.meta).toBeUndefined();
    });

    it('slideshowLoaded returns expected type & payload.', () => {

        // Arrange
        const expectedState: ISlideshowState = InitialState.Slideshow();

        // Act
        const result: IReduxAction = slideshowLoaded(expectedState);

        // Assert
        expect(result.type).toBe('LOAD_SLIDESHOW_FROM_ROUTE');
        expect(result.payload).toBe(expectedState);
        expect(result.error).toBeUndefined();
        expect(result.meta).toBeUndefined();
    });

    it('invalidRoute returns expected type & payload.', () => {

        // Arrange
        const expectedPhotosDisplayType: TPhotosDisplay = 'Slideshow';
        const expectedRoute = '/some/expected/invalid/route';

        const expectedState: IMetaDataState = { ...InitialState.MetaData(), isInvalidRoute: true, arePhotosLoading: false, photosDisplayType: expectedPhotosDisplayType, route: expectedRoute };

        // Act
        const result: IReduxAction = invalidRoute(expectedState);

        // Assert
        expect(result.type).toBe('INVALID_ROUTE');
        expect(result.payload).toBe(expectedState);
        expect(result.error).toBeUndefined();
        expect(result.meta).toBeUndefined();
    });
    
});