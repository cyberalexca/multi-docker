import React from 'react';

import { Link } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    return(
        <div>
            I'm some other page
            <Link to="/">Go back home</Link>
        </div>
    );
};

