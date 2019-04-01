import React from 'react';
import Filter from './Filter';
import { render, fireEvent } from 'react-testing-library'
import { IFilterProps } from './interfaces/IFilterProps';

describe("The photos filter", () => {

    it("When clicked the filter submit button should call the onSubmit function.", () => {

        const submitHandler = jest.fn();

        const filterProps: IFilterProps = {
            values: { tripTypeId: 0, teamId: 0 },
            options: { tripTypeOptions: [], teamOptions: [] },
            onSubmit: submitHandler,
            onTripTypeChange: jest.fn(),
            onTeamChange: jest.fn() 
        }

        const { getByText } = render(
                                        <Filter
                                        values={ filterProps.values }
                                        options={ filterProps.options }
                                        onSubmit={ filterProps.onSubmit }
                                        onTripTypeChange={ filterProps.onTripTypeChange}
                                        onTeamChange={filterProps.onTeamChange}
                                        />
                                    );

        fireEvent.click(getByText('Search'))
        expect(submitHandler).toHaveBeenCalledTimes(1);
    });

})