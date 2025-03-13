import React from "react";
import YouTube from "react-youtube";

const YouTubePlayer: React.FC = () => {
  const videoId = "_23s2aJiXaU"; // YouTube video ID'si (watch?v= sonrası)

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1, // Sayfa açıldığında otomatik oynatma
      modestbranding: 1, // YouTube logosunu gizleme
      controls: 1, // Kullanıcı kontrollerini gösterme
      rel: 0,
      showinfo: 1,
      fs: 1,
    },
  };

  const onReady = (event: any) => {
    event.target.playVideo();
  };

  return (
    <div className="youtube-container">
      <YouTube 
        videoId={videoId} 
        opts={opts} 
        onReady={onReady}
        className="youtube-player"
      />
    </div>
  );
};

export default YouTubePlayer;
