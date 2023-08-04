import React from 'react';
import Artist from '../Artist/Artist';
import './ArtistList.css';

const ArtistList = (props) => {
    return (
        <div className="artistList">
            <h2>Top Artists</h2>
            {props.artists.map((artist, i) => {
                return (
                        <Artist key={artist.id} name={artist.name} reason={artist.reason} link={artist.link} src={artist.src} index={i} />
                )
            })}
        </div>
    )
}

export default ArtistList;