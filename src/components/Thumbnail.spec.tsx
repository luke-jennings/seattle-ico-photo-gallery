import React from 'react';
import moment from 'moment';
import { render, fireEvent, cleanup } from '@testing-library/react';
// The jest-dom/extend-expect adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect';
import IPhoto from '../interfaces/IPhoto';
import Thumbnail from './Thumbnail';

afterEach(cleanup);

const onClickHandlerMock = jest.fn();

const expectedPhoto: IPhoto = {
    id: 1974,
    tripReportId: 900,
    tripReportRoute: 'south-shore-deception-pass-bridge-and-anacortes-sea-kayaking-900',
    tripSummaryRoute: '/what-we-do/trip-report/900/south-shore-deception-pass-bridge-and-anacortes-sea-kayaking',
    destination: 'Deception Pass Bridge and Anacortes sea kayaking',
    team: 'South Shore',
    date: '2018-06-09T00:00:00',
    image: '/images/photos/900_20181211190714987.jpg',
    width: 650,
    height: 487,
    widthThumb: 120,
    heightThumb: 90,
    caption: 'We spent the afternoon sea kayaking with Anacortes Kayak Tours in the waters off of Anacortes. We started the trip from Skyline Marina in Anacortes.'
};

describe('<Thumbnail />', () => {

    it('When image is clicked, the click handler function is called.', () => {

        const { getByAltText } = render(<Thumbnail onClick={onClickHandlerMock} photo={expectedPhoto} />);

        // Act
        fireEvent.click(getByAltText(expectedPhoto.caption));

        // Assert
        expect(onClickHandlerMock).toHaveBeenCalled();
    });
    
    it('A date is displayed in a strong tag and is formated as expected.', () => {

        // Arrange
        const expectedDate =  moment(expectedPhoto.date).format('ddd., MMM. D, Y');

        // Act
        const { container } = render(<Thumbnail onClick={onClickHandlerMock} photo={expectedPhoto} />);

        const strongTag = container.querySelector('strong');

        // Assert
        expect(strongTag).toHaveTextContent(expectedDate);
    });

    it('The last element should be the expected caption text.', () => {

        // Arrange
        const expectedCaption = `[${ expectedPhoto.team }] ${ expectedPhoto.destination }`;

        // Act
        const { container } = render(<Thumbnail onClick={onClickHandlerMock} photo={expectedPhoto} />);

        expect(container.firstChild?.lastChild).toHaveTextContent(expectedCaption);
    });

});