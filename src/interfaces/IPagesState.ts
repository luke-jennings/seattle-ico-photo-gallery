import IPhoto from './IPhoto';

interface IPagesState {

    pageSize: number;

    pageCount: number; // TODO: delete pageCount.  If have page size and photos should be able to calculate pageCount.

    pageIndex: number;

    photos: IPhoto[];
}

export default IPagesState;