// Playlist.js
import React from 'react';

function Playlist({ playlist, handlePlayTrack }) {
  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index} onClick={() => handlePlayTrack(index)}>
            Track {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Playlist;
