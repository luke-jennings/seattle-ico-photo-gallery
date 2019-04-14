import React, { FunctionComponent } from 'react';

interface IFilterMessageProps {
    photosCount: number;
    tripTypeName: string;
    teamName: string;
}

const FilterMessage: FunctionComponent<IFilterMessageProps> = ({photosCount, tripTypeName, teamName}) => {
    return <p className="w-100 text-center mb-3">{ photosCount } photos of type <em>{ tripTypeName }</em> and team <em>{ teamName }</em>.</p>
};

export default FilterMessage;