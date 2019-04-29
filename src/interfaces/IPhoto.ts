export interface IPhoto {
    id: number;
    tripReportId: number;
    tripReportRoute: string;
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