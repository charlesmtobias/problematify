import React from 'react';
import './Artist.css';

const Artist = (props) => {
    const links = props.link && props.link.includes('|') ? props.link.split('|') : [props.link];
    const reasons = props.reason && props.reason.includes('|') ? props.reason.split('|') : [props.reason];
    return (
        <div key={`${props.id}-info`} className="track">
            <div className="info">
                <div className="artist">
                    <img alt={`${props.name} Spotify`} src={props.src} />
                    <br />
                    <span>{`${props.index+1}. ${props.name}`}</span>
                </div>
            <ul className="reasons">
                {links.map((link, i) => <a key={`${props.name}-reason-${i}`} href={link} target='_blank' rel="noreferrer"><li>{reasons[i]}</li></a>)}
            </ul>
            </div>
        </div>
    );
}

export default Artist;