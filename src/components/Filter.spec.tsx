import React from 'react';
import Filter from '../components/Filter';
import { render, fireEvent } from 'react-testing-library'
import { IFilterProps } from '../interfaces/IFilterProps';

describe("The photos filter", () => {

    // Arrange
    const onTripTypeChangeHandler = jest.fn();
    const onTeamsChangeHandler = jest.fn();
    const onSubmitHandler = jest.fn();

    const filterProps: IFilterProps = {
        values: { tripType: { value: 0, text: 'All' }, team: { value: 0, text: 'All' } },
        // Need to include at least one option for both trip types and teams or eles the tests will fail because only the loading message will be rendered.
        options: { tripTypeOptions: [ {"text":"All","value":0,"routeName":"trip-types-all"} ], teamOptions: [ {"text":"All","value":0,"routeName":"teams-all"} ] },
        onSubmit: onSubmitHandler,
        onTripTypeChange: onTripTypeChangeHandler,
        onTeamChange: onTeamsChangeHandler 
    }

    const { getByText, getByLabelText } = render(
                                    <Filter
                                    values={ filterProps.values }
                                    options={ filterProps.options }
                                    onSubmit={ filterProps.onSubmit }
                                    onTripTypeChange={ filterProps.onTripTypeChange}
                                    onTeamChange={filterProps.onTeamChange}
                                    />
                                );

    it("When changed, the trip types select component should call the onTripTypeChange handler.", () => {

        // Act
        fireEvent.change(getByLabelText('Trip Type'))

        // Assert
        expect(onTripTypeChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("When changed, the teams select component should call the onTeamChange handler.", () => {

        // Act
        fireEvent.change(getByLabelText('Teams'))

        // Assert
        expect(onTeamsChangeHandler).toHaveBeenCalledTimes(1);
    });

    /**
     * 
     * NOTE: There is a known issue with jsdom that it will write errors to the console like: Error: Not implemented: HTMLFormElement.prototype.submit
     * https://github.com/jsdom/jsdom/issues/1937
     * https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform
     * To supress this error being written to the console during the test can mock it temporarily:
     * https://stackoverflow.com/questions/44596915/jest-mocking-console-error-tests-fails/49392163#49392163
     */
    it("When clicked, the filter submit button should call the onSubmit onSubmit handler.", () => {

        // Arrange
        let originalConsoleError = console.error;
        console.error = jest.fn();

        // Act
        fireEvent.click(getByText('Search'))

        // Assert
        expect(onSubmitHandler).toHaveBeenCalledTimes(1);
        expect(console.error).toHaveBeenCalledTimes(1);

        // You can see how supressing console.error works by uncommenting the console.log & console.error calls in the lines below.
        // console.log('log still works');
        // console.error('you cant see me');
        console.error = originalConsoleError;
        // console.error('now you can');
    });

});