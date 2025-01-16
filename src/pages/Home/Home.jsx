import React, { useEffect, useState, useRef } from "react";
import './Home.css';
import { useNavigate } from "react-router-dom";
import { db, auth } from '../../config/firebase'; // Firestore without Storage
import { collection, addDoc } from "firebase/firestore";
import { message } from "antd";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('inactive');
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioStream, setAudioStream] = useState(null);
  const mediaRecorder = useRef(null);
  const mimeType = 'audio/webm';

  // Start recording function
  async function startRecording() {
    let tempStream;
    console.log("start recording");
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = streamData;
    } catch (err) {
      console.error(err.message);
      return;
    }

    setRecordingStatus('recording');
    const media = new MediaRecorder(tempStream, { type: mimeType });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        localAudioChunks.push(event.data);
      }
    };
    setAudioChunks(localAudioChunks);
  }

  // Stop recording and process the audio
  async function stopRecording() {
    setRecordingStatus('inactive');
    console.log('Recording stopped');
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      setAudioStream(audioBlob);
      setAudioChunks([]);
    };
  }

  // Upload the recorded audio as Blob directly to Firestore
  const uploadFile = async () => {
    if (!audioStream) {
      message.error("No audio to upload.");
      return;
    }

    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
      message.error("User is not authenticated.");
      return;
    }

    setLoading(true);

    try {
      // Convert the audio Blob to base64 string for storage
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1]; // Get the base64 string (without the prefix)

        await addDoc(collection(db, 'past-texts'), {
          file: "audio-" + new Date().toISOString(), // Naming the audio file
          userId: userId, // Associate the file with the current user
          audio: base64Audio, // Store the audio as base64 string
          text: "", // Add transcribed text if needed
          createdAt: new Date(),
        });

        message.success("File uploaded successfully!");
        navigate('/file');
      };
      reader.readAsDataURL(audioStream); // Convert Blob to base64
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Error uploading file, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="home-main">
      <h1>
        <span className="blue-text">Text</span>
        <span>To</span>
        <span className="blue-text">Speech</span>
      </h1>
      <h3 className="font-medium md:text-lg">
        Record <span className="blue-arrow">&rarr;</span> Transcribe
        <span className="blue-arrow">&rarr;</span> Translate
      </h3>

      {/* Record button */}
      <div className="record">
        <button onClick={startRecording} disabled={recordingStatus === 'recording'}>
          <p>Record <i className="fa-solid fa-microphone"></i></p>
        </button>
        {recordingStatus === 'recording' && (
          <button onClick={stopRecording}>
            Stop Recording <i className="fa-solid fa-stop"></i>
          </button>
        )}
      </div>

      {/* File Upload */}
      <p className="upload-text">
        Or <label className="upload-label">Upload
          <input className="hidden" type="file" accept=".mp3,.wav" onChange={uploadFile} />
        </label>
      </p>

      {/* Upload Recorded File */}
      {audioStream && (
        <button onClick={uploadFile} disabled={loading}>
          {loading ? "Uploading..." : "Upload Recorded File"}
        </button>
      )}
    </main>
  );
}

export default Home;
