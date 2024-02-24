// NowPlaying.js
import React, { useState, useEffect, useRef } from 'react';

function NowPlaying({ playlist }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const storedIndex = localStorage.getItem('currentTrackIndex');
    const storedTime = localStorage.getItem('currentTime');
    if (storedIndex !== null && storedTime !== null) {
      setCurrentTrackIndex(parseInt(storedIndex));
      setCurrentTime(parseFloat(storedTime));
    }
  }, []);

  useEffect(() => {
    if (currentTrackIndex !== null && audioRef.current) {
      audioRef.current.currentTime = currentTime;
      audioRef.current.play();
    }
  }, [currentTrackIndex, currentTime]);

  const handleEnded = () => {
    if (currentTrackIndex !== null) {
      if (currentTrackIndex < playlist.length - 1) {
        setCurrentTrackIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentTrackIndex(null);
      }
    }
  };

  const handlePlayTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('ended', handleEnded);
      return () => {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  useEffect(() => {
    if (currentTrackIndex !== null) {
      localStorage.setItem('currentTrackIndex', currentTrackIndex);
      localStorage.setItem('currentTime', currentTime);
    }
  }, [currentTrackIndex, currentTime]);

  return (
    <div>
      <h2>Now Playing</h2>
      {currentTrackIndex !== null && playlist[currentTrackIndex] && (
        <div>
          <p>Track Name: {playlist[currentTrackIndex]}</p>
          <audio
            ref={audioRef}
            controls
            src={playlist[currentTrackIndex]}
          />
        </div>
      )}
    </div>
  );
}

export default NowPlaying;
