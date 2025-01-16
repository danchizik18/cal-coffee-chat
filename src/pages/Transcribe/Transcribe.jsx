import React from "react";
import { useLocation } from "react-router-dom";

function Transcribe() {
  const location = useLocation();
  const { file } = location.state || {};  // Destructure file from location.state

  if (!file) {
    return <h1>No file to transcribe</h1>;
  }

  return (
    <div>
      <h1>Transcribing <span style = {{
        color: '#007bff',  // Change the color of the file name
        fontSize: '18px',   // Make the file name smaller
        fontWeight: 'bold', // Optional: make it bold
      }}
      >{file.file}</span> <span>...</span></h1>
      {/* Display more information or components related to transcription here */}
    </div>
  );
}

export default Transcribe;
