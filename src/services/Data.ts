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
				.catch(err => {
					console.log(err);
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
			.catch(err => {
				console.log(err);
				return null;
			});

			return photos;
		}
}