import React, { FunctionComponent } from 'react';

const NotFound: FunctionComponent = () => {
    return (
        <>
            <h2 className="text-center mb-4">Sorry, we can't find that page.</h2>

            <img src="/images/404.jpg" className="img-fluid rounded mx-auto d-block" alt="Sorry, we can't find that page." />
        </>
    );
};

export default NotFound;