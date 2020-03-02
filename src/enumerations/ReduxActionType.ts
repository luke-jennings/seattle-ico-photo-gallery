/**
 * The Redux Action Types as a string enum.
 */
export enum ReduxActionType {

    LOAD_GALLERY_FROM_ROUTE = "LOAD_GALLERY_FROM_ROUTE",

    LOAD_GALLERY_FILTERS = "LOAD_GALLERY_FILTERS",

    LOAD_GALLERY_PHOTOS = "LOAD_GALLERY_PHOTOS",

    LOAD_SLIDESHOW_FROM_ROUTE = "LOAD_SLIDESHOW_FROM_ROUTE",

    CHANGE_FILTER = "CHANGE_FILTER", // The user changed their selection in one of the filter drop-downs

    CLICK_SEARCH = "CLICK_SEARCH", // The user clicked the filter search button

    CLICK_PAGING = "CLICK_PAGING", // The user clicked a paging number or arrow

    CLICK_THUMBNAIL = "CLICK_THUMBNAIL", // The user clicked a photo thumbnail

    INVALID_ROUTE = "INVALID_ROUTE"
}