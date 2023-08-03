import React from 'react';
import ArtistList from '../ArtistList/ArtistList'

const Results = (props) => {
    return (
        <div>
            <h2>Results</h2>
            <p>{`You have a ${props.artistList.length * 2}% problematic rating`}</p>
            <ArtistList artists={props.artistList} />
        </div>
    );
}

export default Results;