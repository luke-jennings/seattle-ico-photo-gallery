import { IFilterOptions } from '../interfaces/IFilterOptions';
import { IPhoto } from '../interfaces/IPhoto';
import axios from 'axios';

export class Data {

    public async GetFilterOptions(): Promise<IFilterOptions> {

		let filterOptions: IFilterOptions = { tripTypeOptions: [], teamOptions: [] };

		await axios.get<IFilterOptions>('https://volunteers.seattleico.org/api/photosfilteroptions')
		.then(response => {
			filterOptions = response.data;
		})
		.catch(error => {
			const errorMessage: string = 'GetFilterOptions returned error \"' + error.response.status + ' ' + error.response.statusText + '\".';
			console.log(errorMessage);
			return null;
		});
		
		return filterOptions;
	}
		
	public async GetPhotos(tripTypeId: number, teamId: number): Promise<IPhoto[]> {

		let photos: IPhoto[] = [];

		await axios.get<IPhoto[]>(`https://volunteers.seattleico.org/api/photos?tripTypeId=${tripTypeId}&teamId=${teamId}`)
		.then(response => {
			photos = response.data;
		})
		.catch(error => {
			const errorMessage: string = 'GetPhotos returned error \"' + error.response.status + ' ' + error.response.statusText + '\".';
			console.log(errorMessage);
			return null;
		});

		return photos;
	}
		
	public async GetSlideshow(tripReportId: number): Promise<IPhoto[]> {

		let photos: IPhoto[] = [];

		await axios.get<IPhoto[]>(`https://volunteers.seattleico.org/api/tripReportSlides/${tripReportId}`)
		.then(response => {
			photos = response.data;
		})
		.catch(error => {
			const errorMessage: string = 'GetSlideshow returned error \"' + error.response.status + ' ' + error.response.statusText + '\".';
			console.log(errorMessage);
			return null;
		});

		return photos;
	}
}