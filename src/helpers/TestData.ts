import ISelectOptionRoute from '../interfaces/ISelectOptionRoute';
import IPhoto from '../interfaces/IPhoto';

export const tripTypesOptionsTestData: ISelectOptionRoute[] = [
	{
		'text': 'All',
		'value': 0,
		'routeName': 'trip-types-all'
	},
	{
		'text': 'Backpacking',
		'value': 20,
		'routeName': 'backpacking'
	},
	{
		'text': 'Beach Walk',
		'value': 22,
		'routeName': 'beach-walk'
	},
	{
		'text': 'Bicycling',
		'value': 2,
		'routeName': 'bicycling'
	},
	{
		'text': 'Bird Watching',
		'value': 3,
		'routeName': 'bird-watching'
	},
	{
		'text': 'Canoeing',
		'value': 4,
		'routeName': 'canoeing'
	},
	{
		'text': 'Car Camping',
		'value': 5,
		'routeName': 'car-camping'
	},
	{
		'text': 'Caving',
		'value': 27,
		'routeName': 'caving'
	},
	{
		'text': 'Climbing',
		'value': 28,
		'routeName': 'climbing'
	},
	{
		'text': 'Community Service',
		'value': 16,
		'routeName': 'community-service'
	},
	{
		'text': 'Corn Maze',
		'value': 21,
		'routeName': 'corn-maze'
	},
	{
		'text': 'Earth Day',
		'value': 23,
		'routeName': 'earth-day'
	},
	{
		'text': 'Educational',
		'value': 6,
		'routeName': 'educational'
	},
	{
		'text': 'Farm Visit',
		'value': 7,
		'routeName': 'farm-visit'
	},
	{
		'text': 'Fishing / Shellfishing',
		'value': 26,
		'routeName': 'fishing-shellfishing'
	},
	{
		'text': 'Geocache',
		'value': 18,
		'routeName': 'geocache'
	},
	{
		'text': 'Hiking',
		'value': 8,
		'routeName': 'hiking'
	},
	{
		'text': 'Horseback Riding',
		'value': 19,
		'routeName': 'horseback-riding'
	},
	{
		'text': 'Kayaking',
		'value': 10,
		'routeName': 'kayaking'
	},
	{
		'text': 'Other',
		'value': 1,
		'routeName': 'other'
	},
	{
		'text': 'Sailing',
		'value': 9,
		'routeName': 'sailing'
	},
	{
		'text': 'Skiing / Snowboarding',
		'value': 12,
		'routeName': 'skiing-snowboarding'
	},
	{
		'text': 'Skiing- X-country',
		'value': 11,
		'routeName': 'skiing-x-country'
	},
	{
		'text': 'Snow Camping',
		'value': 15,
		'routeName': 'snow-camping'
	},
	{
		'text': 'Snow Shoeing',
		'value': 14,
		'routeName': 'snow-shoeing'
	},
	{
		'text': 'Snow Sledding',
		'value': 13,
		'routeName': 'snow-sledding'
	},
	{
		'text': 'Surfing',
		'value': 25,
		'routeName': 'surfing'
	},
	{
		'text': 'Tree Planting',
		'value': 24,
		'routeName': 'tree-planting'
	},
	{
		'text': 'Whitewater Rafting',
		'value': 17,
		'routeName': 'whitewater-rafting'
	}
];

export const teamsOptionsTestData: ISelectOptionRoute[] = [
	{
		'text': 'All',
		'value': 0,
		'routeName': 'teams-all'
	},
	{
		'text': 'AAA',
		'value': 2,
		'routeName': 'aaa'
	},
	{
		'text': 'AKS',
		'value': 15,
		'routeName': 'aks'
	},
	{
		'text': 'Austin',
		'value': 13,
		'routeName': 'austin'
	},
	{
		'text': 'Cleveland',
		'value': 18,
		'routeName': 'cleveland'
	},
	{
		'text': 'El Centro',
		'value': 3,
		'routeName': 'el-centro'
	},
	{
		'text': 'EYES',
		'value': 4,
		'routeName': 'eyes'
	},
	{
		'text': 'Franklin',
		'value': 5,
		'routeName': 'franklin'
	},
	{
		'text': 'Gatzert',
		'value': 14,
		'routeName': 'gatzert'
	},
	{
		'text': 'Hale',
		'value': 6,
		'routeName': 'hale'
	},
	{
		'text': 'Hamilton',
		'value': 7,
		'routeName': 'hamilton'
	},
	{
		'text': 'Madrona',
		'value': 9,
		'routeName': 'madrona'
	},
	{
		'text': 'Mercer',
		'value': 10,
		'routeName': 'mercer'
	},
	{
		'text': 'PATH',
		'value': 11,
		'routeName': 'path'
	},
	{
		'text': 'PSKS',
		'value': 16,
		'routeName': 'psks'
	},
	{
		'text': 'Rainier Beach',
		'value': 19,
		'routeName': 'rainier-beach'
	},
	{
		'text': 'Showalter',
		'value': 20,
		'routeName': 'showalter'
	},
	{
		'text': 'South Shore',
		'value': 24,
		'routeName': 'south-shore'
	},
	{
		'text': 'Stevens',
		'value': 12,
		'routeName': 'stevens'
	},
	{
		'text': 'Tukwila',
		'value': 17,
		'routeName': 'tukwila'
	},
	{
		'text': 'Washington',
		'value': 21,
		'routeName': 'washington'
	}
];

export const photosTestData: IPhoto[] = [
    {
        'id': 1935,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211073306123.jpg',
        'width': 650,
        'height': 431,
        'widthThumb': 120,
        'heightThumb': 80,
        'caption': 'The highlight of a fun weekend was rafting on the Wenatchee River.'
    },
    {
        'id': 1936,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211165856020.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Our first stop was a short hike to a lunch spot on Ingalls Creek trail near Blewitt Pass.  22 people crammed into 3 vans with camping gear meant everyone had to hold packs in their laps during the drive, so it was a nice break to stretch our legs.'
    },
    {
        'id': 1937,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211170116803.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Ingalls Creek trail'
    },
    {
        'id': 1938,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211170232055.jpg',
        'width': 487,
        'height': 650,
        'widthThumb': 90,
        'heightThumb': 120,
        'caption': 'The students\' teacher Mr. C brought his ukulele on the trail and played it while we were hiking.'
    },
    {
        'id': 1939,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211170411479.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Ingalls Creek'
    },
    {
        'id': 1940,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-07-17T00:00:00',
        'image': '/images/photos/857_20181211170517777.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Inspecting a log jam on Ingalls Creek.'
    },
    {
        'id': 1941,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211170639607.jpg',
        'width': 650,
        'height': 490,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Enjoying lunch next to Ingalls Creek.'
    },
    {
        'id': 1942,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211170928157.jpg',
        'width': 487,
        'height': 650,
        'widthThumb': 90,
        'heightThumb': 120,
        'caption': 'There was a bat flying around in daylight above where we stopped for lunch.'
    },
    {
        'id': 1943,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211171140550.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Our second short hike was the loop trail around Icicle Gorge.'
    },
    {
        'id': 1944,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211171254692.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'On the Icicle Gorge trail there are many good view points above the swiftly flowing Icicle Creek.'
    },
    {
        'id': 1945,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211171406412.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Wildflowers were in bloom all along the trail.'
    },
    {
        'id': 1946,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211171527070.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Taking a break on the Icicle Gorge trail.'
    },
    {
        'id': 1947,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211171642868.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Our campsite was at the Bridge Creek campground off Icicle Creek Road outside of Leavenworth.'
    },
    {
        'id': 1948,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211171753010.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'Setting up camp at Bridge Creek campground off Icicle Creek Road outside of Leavenworth.'
    },
    {
        'id': 1949,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211171930309.jpg',
        'width': 487,
        'height': 650,
        'widthThumb': 90,
        'heightThumb': 120,
        'caption': 'There were three ukuleles on this trip and many of the students took turns playing them.'
    },
    {
        'id': 1950,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211172033248.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'We enjoyed great food all weekend thanks to our ICO food volunteer who took on the big task for providing meals for 22 people for a weekend.'
    },
    {
        'id': 1951,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211172315579.jpg',
        'width': 487,
        'height': 650,
        'widthThumb': 90,
        'heightThumb': 120,
        'caption': 'Normally, June in Leavenworth is hot, but it was unseasonably cold that weekend.  Everyone was happy to help build a campfire and warm up next to it.'
    },
    {
        'id': 1952,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211172509815.jpg',
        'width': 487,
        'height': 650,
        'widthThumb': 90,
        'heightThumb': 120,
        'caption': 'Playing the card game Uno in camp.'
    },
    {
        'id': 1953,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211172613442.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'An ICO volunteer helps a student learn how to play a Beatles song on the ukulele.'
    },
    {
        'id': 1954,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211172801147.jpg',
        'width': 650,
        'height': 487,
        'widthThumb': 120,
        'heightThumb': 90,
        'caption': 'A campfire, ukuleles, and s\'mores. What more could you ask for?'
    },
    {
        'id': 1955,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211172920101.jpg',
        'width': 487,
        'height': 650,
        'widthThumb': 90,
        'heightThumb': 120,
        'caption': 'We had to wake up early and pack up camp to meet our whitewater rafting guides on time.'
    },
    {
        'id': 1956,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211173116166.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'After the whitewater rafting guides got us geared up we were loaded into an old school bus and driven upriver to Leavenworth where we put the boats in.'
    },
    {
        'id': 1957,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211173614484.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'The students listen to safety lectures from our guides. It was cold in the morning so we all wore yellow splash guard jackets. Normally it is sunny and 90-degrees in mid-June on the Wentachee River, but it ended up being very chilly for that time of year.'
    },
    {
        'id': 1958,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211173800565.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'The beginning of our rafting trip on the Wenatchee River.'
    },
    {
        'id': 1959,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211173851065.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'Floating on a calm section of the Wenatchee River.'
    },
    {
        'id': 1960,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-17T00:00:00',
        'image': '/images/photos/857_20181211173949973.jpg',
        'width': 430,
        'height': 650,
        'widthThumb': 79,
        'heightThumb': 120,
        'caption': 'There are stretches of the Wenatchee that are calm. In spite of the cool weather all the students took turns jumping in the river.'
    },
    {
        'id': 1961,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211174054396.jpg',
        'width': 430,
        'height': 650,
        'widthThumb': 79,
        'heightThumb': 120,
        'caption': 'That water was cold, but all the kids kept jumping in.'
    },
    {
        'id': 1962,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211174252320.jpg',
        'width': 430,
        'height': 650,
        'widthThumb': 79,
        'heightThumb': 120,
        'caption': 'That water was cold, but all the kids kept jumping in.'
    },
    {
        'id': 1963,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211174349696.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'That water is cold!'
    },
    {
        'id': 1964,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211174514292.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'Ready for the rapids.'
    },
    {
        'id': 1965,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211174623121.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'In the whitewater rapids.'
    },
    {
        'id': 1966,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211174803310.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'Whitewater rafting!'
    },
    {
        'id': 1967,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211175119736.jpg',
        'width': 650,
        'height': 433,
        'widthThumb': 120,
        'heightThumb': 80,
        'caption': 'Whitewater rafting!'
    },
    {
        'id': 1968,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211175324035.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'Taking a break between rapids.'
    },
    {
        'id': 1969,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2018-11-18T00:00:00',
        'image': '/images/photos/857_20181211175429083.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'It finally started to warm up while we were on the river.'
    },
    {
        'id': 1970,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211175518522.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'Whitewater rafting!'
    },
    {
        'id': 1971,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211175649742.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'On a calm stretch of the Wenatchee River between rapids.'
    },
    {
        'id': 1972,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211175754525.jpg',
        'width': 650,
        'height': 431,
        'widthThumb': 120,
        'heightThumb': 80,
        'caption': 'Whitewater rafting!'
    },
    {
        'id': 1973,
        'tripReportId': 857,
        'tripReportRoute': 'south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county-857',
        'tripSummaryRoute': '/what-we-do/trip-report/857/south-shore-hiking-camping-and-whitewater-rafting-in-chelan-county',
        'destination': 'Hiking, camping, and whitewater rafting in Chelan County',
        'team': 'South Shore',
        'date': '2017-06-18T00:00:00',
        'image': '/images/photos/857_20181211175845417.jpg',
        'width': 650,
        'height': 430,
        'widthThumb': 120,
        'heightThumb': 79,
        'caption': 'It was a great weekend!'
    }
];