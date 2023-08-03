import React from 'react';
import ArtistList from '../ArtistList/ArtistList'

const Results = (props) => {
    return (
        <div>
            <h2>Results</h2>
            <ArtistList artists={props.artistList} />
        </div>
    );
}

export default Results;