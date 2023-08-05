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
  const [loading, setLoading] = useState(true);

  const handleRangeChange = (event) => {
    setTimeRange(event.target.value);
  }

  useEffect(() => {
    getCancelledArtists();
    setTimeout(() => setLoading(false), 1000)
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
      {loading ? 
      (<div className="loading-bar"><div className="amount"></div></div>) :
      (
        <>
        <Results percentage={percentage} artistList={userCancelled} rangeChange={handleRangeChange} />
        {/*<button className="download">Download Image</button>*/}
        </>
      )
      }
      <footer>
        <p>By <a href="https://chucktoby.com" target='_blank' rel='noreferrer'>Charles Tobias</a></p>
        <p><a href="https://docs.google.com/forms/d/e/1FAIpQLSdqTuPBCHitOCMzqLhcAcUC82joia27hzlFRWwjl-G1qp1kNg/viewform?usp=sf_link" target='_blank' rel='noreferrer'>Submit problematic artists here</a></p>
      </footer>
    </div>
  );
}

export default App;
