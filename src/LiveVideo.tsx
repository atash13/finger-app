import React, { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";

const LiveVideo: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const serverUrl = "wss://fingerapp-8zeasgwk.livekit.cloud"; // LiveKit Cloud URL
  const roomName = "test-room";

  useEffect(() => {
    fetch("http://localhost:5000/api/getLiveKitToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ room: roomName, identity: "user123" }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch((err) => console.error("Token alınamadı:", err));
  }, []);

  if (!token) return <p>Loading...</p>;

  return (
    <>
      <LiveKitRoom serverUrl={serverUrl} token={token}>
        <VideoConference />
      </LiveKitRoom>
    </>
  );
};

export default LiveVideo;
