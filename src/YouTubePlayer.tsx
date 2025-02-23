import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer: React.FC = () => {
  const videoId = "_23s2aJiXaU"; // YouTube video ID'si (watch?v= sonrası)

  const opts = {
    height: "360",
    width: "640",
    playerVars: {
      autoplay: 1, // Sayfa açıldığında otomatik oynatma
      modestbranding: 1, // YouTube logosunu gizleme
      controls: 1, // Kullanıcı kontrollerini gösterme
    },
  };

  return (
    <div className="youtube-container">
      <YouTube videoId={videoId} opts={opts} />
    </div>
  );
};

export default YouTubePlayer;
