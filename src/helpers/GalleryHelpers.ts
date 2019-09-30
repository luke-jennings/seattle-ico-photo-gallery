import { IGalleryState } from '../interfaces/IGalleryState';

export class GalleryHelpers {

    /**
     * Assemble the full URL of the page given the filter slections and paging index.
     * 
     * @param tripTypeRoute The SEO-friendly version of the selected trip type.  Examples are: "hiking", "earth-day", "skiing-x-country"
     * @param teamRoute The SEO-friendly version of the selected team.  Examples are: "teams-all", "mercer", "rainier-beach"
     * @param pageIndex The zero-based paging page number.
     */
    public static BuildPath(tripTypeRoute: string, teamRoute: string, pageIndex: number): string {

        let path: string = `${process.env.REACT_APP_GALLERY_ROOT_PATH}${tripTypeRoute}/${teamRoute}/${(pageIndex + 1)}`;

        return path;
    }

    /**
     * Calculate the total number of paged pages based on the number of photos and the number of thumbnails to display per page.
     * 
     * @param numberOfPhotos The total number of photos.
     * @param pageSize The number of photos to be displayed as thumbnails per page. 
     */
    public static CalculateTotalPages(numberOfPhotos: number, pageSize: number): number {

        return Math.ceil(numberOfPhotos/pageSize)
    }

    /**
     * The message to be displayed that summarizes the number of photos for the selected filter criteria.
     * 
     * @param galleryState The IGalleryState which will have the required properties of photos, tripType, and Team needed to generate the message.
     */
    public static GetFilterMessage(galleryState: IGalleryState){

        const message: string = `${ galleryState.photos.length } photos of type ${ galleryState.tripType.text } and team ${ galleryState.team.text }.`;

        return message;
    }
}