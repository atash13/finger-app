import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer: React.FC = () => {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 1,
      fs: 1,
    },
  };

  const videoId = '_23s2aJiXaU';

  const onReady = (event: any) => {
    event.target.playVideo();
  };

  return (
    <div className="relative w-full h-full">
      <YouTube 
        videoId={videoId} 
        opts={opts} 
        onReady={onReady}
        className="absolute inset-0 w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
};

export default YouTubePlayer;
