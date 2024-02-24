// UploadForm.js
import React from 'react';

function UploadForm({ handleAddToPlaylist }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    handleAddToPlaylist(URL.createObjectURL(file));
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleChange} />
    </div>
  );
}

export default UploadForm;
