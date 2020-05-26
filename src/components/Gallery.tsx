import React, { MouseEvent } from 'react';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import * as toastr from 'toastr';
import { ErrorHelpers } from '../helpers/ErrorHelpers';
import { GalleryHelpers } from '../helpers/GalleryHelpers';
import { InitialState } from '../helpers/InitialState';
import IFilterOptions from '../interfaces/IFilterOptions';
import IFilterSelectedOptionsState from '../interfaces/IFilterSelectedOptionsState';
import IGalleryProps from '../interfaces/IGalleryProps';
import IGalleryState from '../interfaces/IGalleryState';
import IMetaDataState from '../interfaces/IMetaDataState';
import IPhoto from '../interfaces/IPhoto';
import ISelectOption from '../interfaces/ISelectOption';
import ISelectOptionRoute from '../interfaces/ISelectOptionRoute';
import ISlideshowState from '../interfaces/ISlideshowState';
import { Data } from '../services/Data';
import { searchClicked, pagingClicked, filterChanged, galleryPhotosLoaded, galleryLoaded, thumbnailClicked, invalidRoute } from '../store/Actions';
import { AppState } from '../store/ConfigureStore';
import Filter from './Filter';
import ThumbnailGrid from './ThumbnailGrid';

const Gallery = (props: IGalleryProps): JSX.Element => {

    /**
     * Determine the correct filter selections based on the values in the route.
     *
     * @param {IFilterOptions} filterOptions The collections of all trip types and teams.
     * @param {(string | undefined)} tripTypeRouteName The url safe version of the trip type name from the route.
     * @param {(string | undefined)} teamRouteName The url safe version of the team name from the route.
     * @returns {(IFilterSelectedOptionsState | undefined)} The selected filter options parsed to an [[IFilterSelectedOptionsState]]; or if not able to parse the values return undefined.
     */
    const getFilterSelectedOptionsFromRoute = (filterOptions: IFilterOptions, tripTypeRouteName: string | undefined, teamRouteName: string | undefined): IFilterSelectedOptionsState | undefined => {

        if (tripTypeRouteName === undefined && teamRouteName === undefined) {
            return { tripType: { value: 0, text: 'All' }, team: { value: 0, text: 'All' } };
        }

        if (tripTypeRouteName === undefined || teamRouteName === undefined) {
            return undefined;
        }

        const tripTypeSelectOptionRoute: ISelectOptionRoute = filterOptions.tripTypeOptions.filter(tto => { return tto.routeName.toLowerCase() === tripTypeRouteName.toLowerCase(); })[0];
        const teamSelectOptionRoute: ISelectOptionRoute = filterOptions.teamOptions.filter(to => { return to.routeName.toLowerCase() === teamRouteName.toLowerCase(); })[0];

        // Destructure the tripTypeSelectOptionRoute to remove the routeName.
        const { routeName, ...tripTypeSelectOption } = tripTypeSelectOptionRoute;
        // Unfortunately can't use destructuring again since can't declare the variable routeName again, so have to get the properties by assignment.
        const teamSelectOption: ISelectOption = { value: teamSelectOptionRoute.value, text: teamSelectOptionRoute.text };

        if (tripTypeSelectOption !== undefined && teamSelectOption !== undefined) {
            return { tripType: tripTypeSelectOption, team: teamSelectOption };
        }

        return undefined;
    };

    /**
     * When the user clicks the search button or clicks on paging, update the route and apply it to the history.
     *
     * @param {number} tripTypeId The id of the selected trip type option.
     * @param {number} teamId The id of the selected team option.
     * @param {number} pageIndex The index of the slected paging page. Note this is a zero-based index.
     * @returns {string} The new route.  Should look something like: "/what-we-do/photos/horseback-riding/rainier-beach/1"
     */
    const updateGalleryRoute = (tripTypeId: number, teamId: number, pageIndex: number): string => {

        const tripTypeRoute: string = props.filter.filterOptions.tripTypeOptions.filter(tto => { return tto.value === tripTypeId; })[0].routeName;
        const teamRoute: string = props.filter.filterOptions.teamOptions.filter(to => { return to.value === teamId; })[0].routeName;
        const route: string = GalleryHelpers.BuildPath(tripTypeRoute, teamRoute, pageIndex);
        
        props.history.push(route);
        
        return route;
    };

    /**
     * When the user changes the trip type filter selection update the redux store.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event The event raised by chaning the select option.
     */
    const handleTripTypeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {

        const tripTypeSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text };

        props.filterChanged({ team: props.filter.team, tripType: tripTypeSelected });
    };
    
    /**
     * When the user changes the team filter selection update the redux store.
     *
     * @param {React.ChangeEvent<HTMLSelectElement>} event The event raised by chaning the select option.
     */
    const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {

        const teamSelected: ISelectOption = { value: Number(event.target.value), text: event.target.options[event.target.selectedIndex].text };

        props.filterChanged({ team: teamSelected, tripType: props.filter.tripType });
    };

    /**
     * When the user clicks the search button update the route and update the photos loading state to true in the redux store.
     *
     * @param {React.FormEvent<HTMLFormElement>} event The event generated by the user clicking the Search button.
     */
    const handleSearchClicked = (event: React.FormEvent<HTMLFormElement>): void => {
        
        event.preventDefault();

        const updatedRoute: string = updateGalleryRoute(props.filter.tripType.value, props.filter.team.value, 0);

        const updatedGalleryState: IGalleryState = { ...props.metaData, ...props.filter, ...props.pages, arePhotosLoading: true, route: updatedRoute };

        props.searchClicked(updatedGalleryState);
    };

    /**
     * When the user clicks on one of the paging links update the route and paging index in the redux store.
     *
     * @param {{ selected: number; }} selectedItem The index of the paging page from clicking on the [[ReactPaginate]] control.
     */
    const handlePageClick = (selectedItem: { selected: number }): void => {
        
        const updatedRoute: string = updateGalleryRoute(props.filter.tripType.value, props.filter.team.value, selectedItem.selected);

        const updatedState: ISlideshowState = { ...props.metaData, ...props.pages, pageIndex: selectedItem.selected, route: updatedRoute };

        props.pagingClicked(updatedState);
    };

    /**
     * When the user clicks on a thumbnail update the route so that the user will be shown the [[Slideshow]] control.
     *
     * @param {MouseEvent<HTMLAnchorElement>} event The event information generated by clicking on a thumbnail image.
     */
    const handleThumbnailClick = (event: MouseEvent<HTMLAnchorElement>): void => {
        
        const photoId = Number(event.currentTarget.id);

        const photo: IPhoto = props.pages.photos.filter(p => { return p.id === photoId; })[0];
        
        const photos: IPhoto[] = props.pages.photos.filter(p => { return p.tripReportId === photo.tripReportId; });

        const page: number = photos.indexOf(photo) + 1;

        // Adding the || '' is to make the compiler happy, otherwise it complains that the environment variable could be undefined.
        const path = `${(process.env.REACT_APP_SLIDESHOW_ROOT_PATH || '')}${photo.id}/${photo.tripReportRoute}/${page}`;

        const updatedState: IMetaDataState = { ...props.metaData, arePhotosLoading: true, photosDisplayType: 'Slideshow', routeBackToGallery: props.location.pathname };
        
        props.thumbnailClicked(updatedState);
        props.history.push(path);
    };

    // Load the photos
    React.useEffect(() => {

        const getPhotos = async (tripTypeId: number, teamId: number): Promise<void> => {

            const data = new Data();
            let galleryPhotos: IPhoto[] = [];

            try {

                galleryPhotos = await data.GetPhotos(tripTypeId, teamId);

            } catch(error) {

                toastr.error('Sorry, there was an error retrieving the photos.', '', ErrorHelpers.GetToastrOptionsForPersistent());
                return;
            }

            const totalPages = GalleryHelpers.CalculateTotalPages(galleryPhotos.length, props.pages.pageSize);
            const pageFromRouteValues = Number(props.match.params.pageNumber);

            let pageIndex = 0;

            if (galleryPhotos !== null && galleryPhotos.length < 1) {

                const message = `Sorry, there are not any photos for your search for type <em>${props.filter.tripType.text}</em> and team <em>${props.filter.team.text}</em>.`;
                toastr.warning(message, '', ErrorHelpers.GetToastrOptionsForLongerTimeout());
            }
            else {
    
                const invalidRouteState: IMetaDataState = { ...props.metaData, isInvalidRoute: true, arePhotosLoading: false, route: window.location.pathname };
                const invalidRouteErrorMessage = 'The route parameters are either of the wrong type or out of range.';

                if (Number.isNaN(pageFromRouteValues)) {
                    if (props.location.pathname === process.env.REACT_APP_GALLERY_ROOT_PATH) {
                        pageIndex = 0;
                    } else {
                        props.invalidRoute(invalidRouteState);
                        toastr.error(invalidRouteErrorMessage, '', ErrorHelpers.GetToastrOptionsForLongerTimeout());
                        return;
                    }
                }
                else if (pageFromRouteValues > totalPages || pageFromRouteValues < 1) {
                    props.invalidRoute(invalidRouteState);
                    toastr.error(invalidRouteErrorMessage, '', ErrorHelpers.GetToastrOptionsForLongerTimeout());
                    return;
                }
                else {
                    pageIndex = pageFromRouteValues - 1;
                }
            }

            const updatedGalleryState: IGalleryState = { ...props.metaData, ...props.filter, ...props.pages, photos: galleryPhotos, pageCount: totalPages, pageIndex: pageIndex, arePhotosLoading: false };

            props.galleryPhotosLoaded(updatedGalleryState);
        };

        if (props.metaData.arePhotosLoading && props.filter.filterOptions.tripTypeOptions.length > 0 && props.filter.filterOptions.teamOptions.length > 0) {

            getPhotos(props.filter.tripType.value, props.filter.team.value);
        }

    }, [props.filter.tripType.value, props.filter.team.value, props.metaData.arePhotosLoading]);

    // Replaces componentDidMount
    // Get the filter options and update the redux store with the filter options and route.
    // Included an empty array [] as the second parameter to insure this useEffect will only run once.
    React.useEffect(() => {
        
        const getFilterOptions = async (): Promise<void> => {

            let filterOptions: IFilterOptions | null = null;

            if (props.filter.filterOptions.tripTypeOptions.length > 0 || props.filter.filterOptions.teamOptions.length > 0) {

                filterOptions = props.filter.filterOptions;

            } else {

                try {
                    
                    const data = new Data();

                    filterOptions = await data.GetFilterOptions();
                }
                catch(error) {

                    toastr.error('Sorry, there was an error retrieving the filter options.', '', ErrorHelpers.GetToastrOptionsForPersistent());
                }
            }

            if (filterOptions !== null && typeof filterOptions !== 'undefined') {
    
                const filterSelectedOptionsFromRoute: IFilterSelectedOptionsState | undefined = getFilterSelectedOptionsFromRoute(filterOptions, props.match.params.tripTypeName, props.match.params.teamName);
    
                const invalidRouteState: IMetaDataState = { ...props.metaData, isInvalidRoute: true, arePhotosLoading: false, route: window.location.pathname, photosDisplayType: 'Thumbnails' };
                const invalidRouteErrorMessage = 'The route parameters are either of the wrong type or out of range.';
    
                if (filterSelectedOptionsFromRoute === undefined) {
                    props.invalidRoute(invalidRouteState);
                    toastr.error(invalidRouteErrorMessage, '', ErrorHelpers.GetToastrOptionsForLongerTimeout());
                    return;
                }
    
                const galleryInitialState: IGalleryState = { ...InitialState.Gallery(), route: props.location.pathname, filterOptions: filterOptions, tripType: filterSelectedOptionsFromRoute.tripType, team: filterSelectedOptionsFromRoute.team };

                props.galleryLoaded(galleryInitialState);
    
            } else {

                toastr.error('Sorry, can\'t request photos without the filter options.', '', ErrorHelpers.GetToastrOptionsForPersistent());

                return;
            }

        };

        getFilterOptions();

    }, []);

    if (props.metaData.isInvalidRoute) {

        return (
            <div className="App container mb-2">
                <div className="row"><h2 className="mx-auto">Sorry, that is not a valid page.</h2></div>
            </div>);

    } else {

        return (
            <div className="App container mb-2">

                <div className="row w-100">
                    <Filter
                        values={{ tripType: props.filter.tripType, team: props.filter.team }}
                        options = {props.filter.filterOptions}
                        onTripTypeChange={handleTripTypeChange}
                        onTeamChange={handleTeamChange}
                        onSubmit={handleSearchClicked}
                        />
                </div>

                <div className="container">

                    { props.metaData.arePhotosLoading ? 
                    (<h2 className="mx-auto">Loading Photos...</h2>) :
                    (<div>
                            <p className="w-100 text-center mb-3">{ props.filter.message }</p>

                            <ReactPaginate
                                pageCount={ props.pages.pageCount }
                                pageRangeDisplayed={5}
                                marginPagesDisplayed={3}
                                previousLabel={'<<'}
                                nextLabel={'>>'}
                                breakLabel={'...'}
                                breakClassName={'page-item'}
                                breakLinkClassName={'page-link'}
                                pageClassName={'page-item'}
                                pageLinkClassName={'page-link'}
                                previousClassName={'page-item'}
                                previousLinkClassName={'page-link rounded-left'}
                                nextClassName={'page-item rounded-right'}
                                nextLinkClassName={'page-link'}
                                disabledClassName={'disabled'}
                                onPageChange={ handlePageClick }
                                disableInitialCallback={true}
                                initialPage={0}
                                containerClassName={'pagination pagination-sm justify-content-center mb-4'}
                                activeClassName={'active'}
                                forcePage={ props.pages.pageIndex }
                            />

                            <ThumbnailGrid page={ props.pages.pageIndex } pageSize={ props.pages.pageSize } photos={ props.pages.photos } onPageChange={ handleThumbnailClick } />
                    </div>)}
                </div>

            </div>
        );

    }
};

const mapStateToProps = (state: AppState) => {

    return ({
        metaData: state.metaData,
        filter: state.filter,
        pages: state.pages
    });
};

const mapDispatchToProps = { searchClicked, pagingClicked, filterChanged, galleryPhotosLoaded, galleryLoaded, thumbnailClicked, invalidRoute };

export default connect (
    mapStateToProps,
    mapDispatchToProps
) (Gallery);
