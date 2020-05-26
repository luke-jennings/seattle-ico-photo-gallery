interface IPhoto {

    id: number;

    tripReportId: number;

    tripReportRoute: string;

    tripSummaryRoute: string;

    destination: string;

    team: string;

    date: string;

    image: string;

    width: number;

    height: number;

    widthThumb: number;

    heightThumb: number;
    
    caption: string;
}

export default IPhoto;