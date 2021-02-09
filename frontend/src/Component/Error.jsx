import React from 'react';

function Error ({error}) {
    return (
        <p className="text-danger">{error}</p>
    );

}

export default Error;