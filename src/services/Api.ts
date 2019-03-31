import { ISelectOption } from '../interfaces/ISelectOption';
import { IFilterOptions } from '../interfaces/IFilterOptions';

const tripTypesOptions: ISelectOption[] = [
	{
		text: "All",
		value: 0
	}, 
	{
		text: "Backpacking",
		value: 20
	}, 
	{
		text: "Beach Walk",
		value: 22
	}, 
	{
		text: "Bicycling",
		value: 2
	}, 
	{
		text: "Bird Watching",
		value: 3
	}, 
	{
		text: "Canoeing",
		value: 4
	}, 
	{
		text: "Car Camping",
		value: 5
	}, 
	{
		text: "Community Service",
		value: 16
	}, 
	{
		text: "Corn Maze",
		value: 21
	}, 
	{
		text: "Earth Day",
		value: 23
	}, 
	{
		text: "Educational",
		value: 6
	}, 
	{
		text: "Farm Visit",
		value: 7
	}, 
	{
		text: "Fishing / Shellfishing",
		value: 26
	}, 
	{
		text: "Geocache",
		value: 18
	}, 
	{
		text: "Hiking",
		value: 8
	}, 
	{
		text: "Horseback Riding",
		value: 19
	}, 
	{
		text: "Kayaking",
		value: 10
	}, 
	{
		text: "Other",
		value: 1
	}, 
	{
		text: "Sailing",
		value: 9
	}, 
	{
		text: "Skiing / Snowboarding",
		value: 12
	}, 
	{
		text: "Skiing- X-country",
		value: 11
	}, 
	{
		text: "Snow Camping",
		value: 15
	}, 
	{
		text: "Snow Shoeing",
		value: 14
	}, 
	{
		text: "Snow Sledding",
		value: 13
	}, 
	{
		text: "Surfing",
		value: 25
	}, 
	{
		text: "Tree Planting",
		value: 24
	}, 
	{
		text: "Whitewater Rafting",
		value: 17
	} 
];

const teamsOptions: ISelectOption[] = [
  {
    text: "All",
    value: 0
  },
  {
    text: "Cleveland",
    value: 18
  },
  {
    text: "EYES",
    value: 4
  }, 
  {
    text: "Franklin",
    value: 5
  }, 
  {
    text: "Gatzert",
    value: 14
  }, 
  {
    text: "Hale",
    value: 6
  }, 
  {
    text: "Hamilton",
    value: 7
  }, 
  {
    text: "Madrona",
    value: 9
  }, 
  {
    text: "Mercer",
    value: 10
  },
  {
    text: "PSKS",
    value: 16
  }, 
  {
    text: "Rainier Beach",
    value: 19
  }, 
  {
    text: "Showalter",
    value: 20
  }, 
  {
    text: "South Shore",
    value: 24
  }, 
  {
    text: "Stevens",
    value: 12
  }, 
  {
    text: "Tukwila",
    value: 17
  }, 
  {
    text: "Washington",
    value: 21
  } 
];

export class Api {

    public GetFilterOptions(): IFilterOptions {
        return { tripTypeOptions: tripTypesOptions, teamOptions: teamsOptions }
    }
}