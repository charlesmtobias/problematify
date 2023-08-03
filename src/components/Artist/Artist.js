import React from 'react';

const Artist = (props) => {
    return (
        <div>
            <h3>{props.name}</h3>
            <a href={props.src}>{props.reason}</a>
        </div>
    );
}

export default Artist;