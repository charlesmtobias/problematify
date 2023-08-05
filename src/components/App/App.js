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
  const [percentage, setPercentage] = useState(0);

  const handleRangeChange = (event) => {
    setTimeRange(event.target.value);
  }

  useEffect(() => {
    getCancelledArtists();
  }, [])

  useEffect(() => {
    Spotify.getArtists(timeRange)
    .then((b) => setUserArtists(b));
 }, [timeRange]);

  useEffect(() => {
    let combinedList = [];
    let score = 0;

    userArtists.forEach((artist, j) => {
      for(let i = 0; i < cancelledArtists.length; i++) {
          if(cancelledArtists[i].uri === artist.uri) {
            combinedList.push({ ...cancelledArtists[i], src: artist.url, id: artist.id});
            score += userArtists.length - j;
          }
      }
    })
    setUserCancelled(combinedList);
    setPercentage(Math.ceil((score / (userArtists.length * (userArtists.length+1)/2)) * 100));

  }, [userArtists, cancelledArtists])

  const getCancelledArtists = () => {
    Sheets.getArtists()
    .then(a => setCancelledArtists(a));
  }

  return (
    <div className="App">
      <h1>Problematify</h1>
      <Results percentage={percentage} artistList={userCancelled} rangeChange={handleRangeChange} />
    </div>
  );
}

export default App;
