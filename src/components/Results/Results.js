import React from 'react';
import './Results.css';
import ArtistList from '../ArtistList/ArtistList'

const Results = (props) => {
    return (
        <div className="results">
            <span className="percentage">You have a <span className="green">{props.percentage}%</span> problematic rating in the last 
      <select onChange={props.rangeChange} defaultValue={'medium_term'} >
        <option value="short_term">1 Month</option>
        <option value="medium_term">6 Months</option>
        <option value="long_term">All Time</option>
      </select></span>
            <div id="bar"><div id="amount" style={{clipPath: `inset(0 ${100 - props.percentage}% 0 0)`}}></div></div>
            <ArtistList className="artistList" artists={props.artistList} />
        </div>
    );
}

export default Results;