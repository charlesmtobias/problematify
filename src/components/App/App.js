import logo from '../../logo.svg'
import React, { useState, useEffect } from 'react';
import './App.css';
import Results from '../Results/Results';
import Spotify from '../../util/Spotify';

const cancelledList = [
  {
    name: 'Rex Orange County',
    reason: 'Bad guy',
    src: 'https://google.com/',
    uri: 'spotify:artist:7pbDxGE6nQSZVfiFdq9lOL'
  },
  {
    name: 'Kiss',
    reason: 'Evil stuff',
    src: 'https://wikipedia.org/',
    uri: 'spotify:artist:07XSN3sPlIlB2L2XNcTwJw'
  },
  {
    name: 'Guns N\' Roses',
    reason: 'He hit girlfriend',
    src: 'https://badguys.com',
    uri: 'spotify:artist:3qm84nBOXUEQ2vnTfUTTFC'
  }
];

const userList = [
  {
    name: 'Kiss',
    uri: 'spotify:artist:07XSN3sPlIlB2L2XNcTwJw'
  },
  {
    name: 'Rex Orange County',
    uri: 'spotify:artist:7pbDxGE6nQSZVfiFdq9lOL'
  }
]

function App() {
  const [timeRange, setTimeRange] = useState('medium_term');
  const [userArtists, setUserArtists] = useState([]);
  const [cancelledArtists, setCancelledArtists] = useState([]);
  const [userCancelled, setUserCancelled] = useState([]);

  const handleRangeChange = (event) => {
    setTimeRange(event.target.value);
  }

  useEffect(() => {
    let combinedList = [];
    cancelledList.map(artist => {
      for(let i = 0; i < userList.length; i++) {
          if(userList[i].uri === artist.uri) {
            combinedList.push(artist);
            return artist;
          }
      }
    });
    getArtists();
    setUserCancelled(combinedList);
 }, [timeRange]);

  const getArtists = async () => {
    const a = await Spotify.getArtists(timeRange);
    setUserArtists(a);
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
      <Results artistList={userArtists} />
    </div>
  );
}

export default App;
