import React, { useState, useEffect } from 'react';
import './App.css';
import Results from '../Results/Results';
import Spotify from '../../util/Spotify';
import Sheets from '../../util/Sheets';

function App() {
  const [timeRange, setTimeRange] = useState('medium_term');
  const [userArtists, setUserArtists] = useState([]);
  const [cancelledArtists, setCancelledArtists] = useState([]);
  const [userCancelled, setUserCancelled] = useState([]);

  const handleRangeChange = (event) => {
    setTimeRange(event.target.value);
  }

  useEffect(() => {
    getArtists()
 }, [timeRange]);

  const getArtists = async () => {
    Spotify.getArtists(timeRange)
    .then(a => setUserArtists(a));
    Sheets.getArtists()
    .then(c => setCancelledArtists(c));
    compareArtists().then(combo => setUserCancelled(combo));
  }

  const compareArtists = async () => {
    let combinedList = [];
    userArtists.map(artist => {
      for(let i = 0; i < cancelledArtists.length; i++) {
          if(cancelledArtists[i].uri === artist.uri) {
            combinedList.push(cancelledArtists[i]);
            return artist;
          }
      }
    });
    return combinedList;
  }

  return (
    <div className="App">
      <h1>Problematify</h1>
      <p>Time Range:</p>
      <select onChange={handleRangeChange} >
        <option value="short_term">1 Month</option>
        <option value="medium_term" selected>6 Months</option>
        <option value="long_term">All Time</option>
      </select>
      <Results artistList={userCancelled} />
    </div>
  );
}

export default App;
