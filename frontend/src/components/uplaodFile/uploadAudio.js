import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UploadAudio = () => {
  const [buttonName, setButtonName] = useState("Play");
  const [audioFile, setAudioFile] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setButtonName("Play");
    }

    if (audioFile) {
      const newAudio = new Audio(URL.createObjectURL(audioFile));
      newAudio.addEventListener("ended", () => {
        setButtonName("Play");
      });
      setAudio(newAudio);
    }
  }, [audioFile]);

  const handleClick = () => {
    if (buttonName === "Play") {
      audio.play();
      setButtonName("Pause");
    } else {
      audio.pause();
      setButtonName("Play");
    }
  };

  const handleUploadAudio = async () => {
    if (audioFile) {
      const formData = new FormData();
      formData.append("audioFile", audioFile);

      await fetch("http://localhost:7000/audio", {
        method: "post",
        body: formData,
      })
        .then((response) => {
          console.log("Audio uploaded successfully", response);
        })
        .catch((error) => {
          console.error("Failed to upload audio", error);
        });
    }
  };

  return (
    <>
      {" "}
      <Link to="/">Back to Home</Link>
      <div
        style={{
          position: "relative",
          margin: "auto",
          textAlign: "center",
          paddingTop: "100px",
        }}
      >
        <button onClick={handleClick}>{buttonName}</button>
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setAudioFile(e.target.files[0])}
        />
        <button onClick={handleUploadAudio}>Upload Audio</button>
      </div>
    </>
  );
};

export default UploadAudio;
