import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Data } from './Data';
import { tripTypesOptionsTestData, teamsOptionsTestData, photosTestData } from '../helpers/TestData';
import { IFilterOptions } from '../interfaces/IFilterOptions';

const filterOptions: IFilterOptions = { tripTypeOptions: tripTypesOptionsTestData, teamOptions: teamsOptionsTestData };

describe("The Data service class", () => {

    it("When GetFilterOptions is called it should return all filter options.", async () => {

			let axiosMockAdapter = new MockAdapter(axios);
			axiosMockAdapter.onGet('https://volunteers.seattleico.org/api/photosfilteroptions').reply(200, filterOptions);

			const axiosSpy = jest.spyOn(axios, 'get');
			const sut = new Data();

			const result = await sut.GetFilterOptions();

			expect(axiosSpy).toHaveBeenCalled();
			expect(result).toEqual(filterOptions);
    });

    it("When GetFilterOptions is called and there is a server error it should it should log error to console and return filter options with empty arrays.", async () => {

			const expectedFilterOptions: IFilterOptions = { teamOptions: [], tripTypeOptions: [] };

			let axiosMockAdapter = new MockAdapter(axios);
			axiosMockAdapter.onGet('https://volunteers.seattleico.org/api/photosfilteroptions').reply(500);

			const axiosSpy = jest.spyOn(axios, 'get');
			const sut = new Data();

			const consoleSpy = jest.spyOn( console, 'log' );

			const result = await sut.GetFilterOptions();

			expect(axiosSpy).toHaveBeenCalled();
			expect(consoleSpy).toHaveBeenCalled();
			expect(result).toEqual(expectedFilterOptions);
    });

    it("When Photos is called with trip type Whitewater Rafting (17) and team South Shore (24) selected it should return 39 photos.", async () => {

			let axiosMockAdapter = new MockAdapter(axios);
			axiosMockAdapter.onGet('https://volunteers.seattleico.org/api/photos?tripTypeId=17&teamId=24').reply(200, photosTestData);

			const axiosSpy = jest.spyOn(axios, 'get');
			const sut = new Data();

			const result = await sut.GetPhotos(17, 24);

			expect(axiosSpy).toHaveBeenCalled();
			expect(result).toBe(photosTestData);
			expect(result.length).toBe(39);
		});

    it("When Photos is called with trip type Geocache (18) and team All (0) selected it should log error to console and return 0 photos.", async () => {

			let axiosMockAdapter = new MockAdapter(axios);
			axiosMockAdapter.onGet('https://volunteers.seattleico.org/api/photos?tripTypeId=18&teamId=0').reply(404);

			const axiosSpy = jest.spyOn(axios, 'get');
			const sut = new Data();

			const consoleSpy = jest.spyOn( console, 'log' ); 

			const result = await sut.GetPhotos(18, 0);

			expect(axiosSpy).toHaveBeenCalled();
			expect(consoleSpy).toHaveBeenCalled();
			expect(result).toEqual([]);
		});

    it("When get slideshow photos is called with South Shore's Whitewater rafting trip report id 857 it should return 39 photos.", async () => {

			let axiosMockAdapter = new MockAdapter(axios);
			axiosMockAdapter.onGet('https://volunteers.seattleico.org/api/tripReportSlides/857').reply(200, photosTestData);

			const axiosSpy = jest.spyOn(axios, 'get');
			const sut = new Data();

			const result = await sut.GetSlideshow(857);

			expect(axiosSpy).toHaveBeenCalled();
			expect(result).toBe(photosTestData);
			expect(result.length).toBe(39);
		});

    it("When get slideshow photos is called with trip id 0 it should log error to console and return 0 photos.", async () => {

			let axiosMockAdapter = new MockAdapter(axios);
			axiosMockAdapter.onGet('https://volunteers.seattleico.org/api/tripReportSlides/0').reply(404);

			const axiosSpy = jest.spyOn(axios, 'get');
			const sut = new Data();

			const consoleSpy = jest.spyOn( console, 'log' ); 

			const result = await sut.GetSlideshow(0);

			expect(axiosSpy).toHaveBeenCalled();
			expect(consoleSpy).toHaveBeenCalled();
			expect(result).toEqual([]);
    });

});