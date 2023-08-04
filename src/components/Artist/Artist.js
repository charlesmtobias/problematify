import React from 'react';
import './Artist.css';

const Artist = (props) => {
    const links = props.link && props.link.includes('|') ? props.link.split('|') : [props.link];
    const reasons = props.reason && props.reason.includes('|') ? props.reason.split('|') : [props.reason];
    return (
        <div class="track">
            <div class="info">
                <div class="artist">
                    <img src={props.src} />
                    <br />
                    <span>{`${props.index+1}. ${props.name}`}</span>
                </div>
            <ul class="reasons">
                {links.map((link, i) => <a href={link} target='_blank'><li>{reasons[i]}</li></a>)}
            </ul>
            </div>
        </div>
    );
}

export default Artist;