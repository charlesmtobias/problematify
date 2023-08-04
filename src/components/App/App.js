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
    getArtists();
    compareArtists();
 }, [timeRange]);

  const getArtists = async () => {
    Sheets.getArtists()
    .then(a => setCancelledArtists(a));
    Spotify.getArtists(timeRange)
    .then((b) => setUserArtists(b));
  }

  const compareArtists = () => {
    let combinedList = [];
    userArtists.map(artist => {
      for(let i = 0; i < cancelledArtists.length; i++) {
          if(cancelledArtists[i].uri === artist.uri) {
            combinedList.push({ ...cancelledArtists[i], src: artist.url});
            return artist;
          }
      }
    })
    setUserCancelled(combinedList);
  }

  return (
    <div className="App">
      <h1>Problematify</h1>
      <Results artistList={userCancelled} rangeChange={handleRangeChange} />
    </div>
  );
}

export default App;
