import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import YouTubePlayer from './YouTubePlayer';

interface Message {
  sender: string;
  text: string;
}

interface LocationState {
  image: {
    author: string;
    download_url: string;
    id: string;
  }
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "AnnFleminge", text: "Hello! How's your day?" },
    { sender: "You", text: "Hey! It's going great. You?" },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;

  useEffect(() => {
    if (!state?.image) {
      navigate('/');
    }
  }, [state, navigate]);

  const scrollToBottom = () => {
    if (!userScrolled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const isAtBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
    setUserScrolled(!isAtBottom);
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    setMessages([...messages, { sender: 'You', text: newMessage }]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!state?.image) {
    return null;
  }

  return (
    <div className="flex h-[calc(100vh-60px)]">
      <div className="flex-[2] min-w-0 relative bg-black">
        <div className="w-full h-full">
          <YouTubePlayer />
          <div className="absolute top-2.5 left-2.5 bg-black/50 text-white px-2.5 py-1.5 rounded z-10">
            {state.image.author || "Unknown Author"}
          </div>
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col bg-gray-100">
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          onScroll={handleScroll}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === 'You'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                <div className="font-semibold mb-1">{message.sender}</div>
                <div className="break-words">{message.text}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 resize-none rounded-lg border border-gray-300 p-2 focus:outline-none focus:border-blue-500"
              rows={2}
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
