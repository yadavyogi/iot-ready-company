// App.js
import React, { useState, useEffect } from 'react';
import Playlist from './Playlist';

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  useEffect(() => {
    const storedIndex = localStorage.getItem('currentTrackIndex');
    if (storedIndex !== null) {
      setCurrentTrackIndex(parseInt(storedIndex));
    }
  }, []);

  const handleAddToPlaylist = (file) => {
    setPlaylist([...playlist, URL.createObjectURL(file)]);
  };

  const handlePlayTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    if (currentTrackIndex !== null && currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentTrackIndex(null);
    }
  };

  useEffect(() => {
    if (currentTrackIndex !== null) {
      localStorage.setItem('currentTrackIndex', currentTrackIndex);
    }
  }, [currentTrackIndex]);

  return (
    <div>
      <h1>Audio Player</h1>
      <input type="file" accept="audio/*" onChange={(e) => handleAddToPlaylist(e.target.files[0])} />
      <Playlist playlist={playlist} handlePlayTrack={handlePlayTrack} />
      {currentTrackIndex !== null && (
        <div>
          <h2>Now Playing</h2>
          <p>Track {currentTrackIndex + 1}</p>
          <audio
            controls
            src={playlist[currentTrackIndex]}
            onEnded={handleEnded}
            autoPlay
          />
        </div>
      )}
    </div>
  );
}

export default App;
