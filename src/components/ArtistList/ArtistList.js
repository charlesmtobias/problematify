import React from 'react';
import Artist from '../Artist/Artist';

const ArtistList = (props) => {
    return (
        <div>
            {props.artists.map(artist => {
                return (
                    <Artist name={artist.name} reason={artist.reason} src={artist.src} />
                )
            })}
        </div>
    )
}

export default ArtistList;