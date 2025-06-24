import React, { useState, useRef, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import YouTubePlayer from "./YouTubePlayer";

interface Message {
  sender: string;
  text: string;
}

interface LocationState {
  image: {
    author: string;
    download_url: string;
    id: string;
    category: "girl" | "boy" | "couple";
    tags: Record<string, string[]>;
    videoId?: string;
  };
}

interface Image {
  id: string;
  download_url: string;
  author: string;
  category: "girl" | "boy" | "couple";
  tags: Record<string, string[]>;
  videoId?: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: "AnnFleminge", text: "Hello! How's your day?" },
    { sender: "You", text: "Hey! It's going great. You?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const [relatedImages, setRelatedImages] = useState<Image[]>([]);

  useEffect(() => {
    if (!state?.image) {
      navigate("/");
      return;
    }

    fetch("https://picsum.photos/v2/list?page=1&limit=400")
      .then((res) => res.json())
      .then((data) => {
        // Simülasyon: random tag eşleşmesi
        const matches = data
          .filter((img: any) => img.id !== state.image.id)
          .map((img: any) => ({
            ...img,
            category: ["girl", "boy", "couple"][Math.floor(Math.random() * 3)],
            tags: state.image.tags, // aynı tag yapısı eklenmiş gibi simüle
            videoId: "_23s2aJiXaU",
          }))
          .filter((img: Image) => {
            return img.category === state.image.category;
          });

        const shuffled = matches.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setRelatedImages(selected);
      });
  }, [state, navigate]);

  const scrollToBottom = () => {
    if (!userScrolled && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    const isAtBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
    setUserScrolled(!isAtBottom);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!state?.image) return null;

  return (
    <div className="flex h-[calc(100vh-60px)]">
      {/* Sol: Video - %65 */}
      <div className="w-[65%] bg-black relative">
        <YouTubePlayer videoId={state.image.videoId || "_23s2aJiXaU"} />
        <div className="absolute top-2.5 left-2.5 bg-black/50 text-white px-2.5 py-1.5 rounded z-10">
          {state.image.author || "Unknown Author"}
        </div>
      </div>

      {/* Orta: Chat - %25 */}
      <div className="w-[25%] flex flex-col bg-gray-100 border-l border-r">
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
          onScroll={handleScroll}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[90%] rounded-lg p-3 ${
                  message.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
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

      {/* Sağ: Card kolon - %10 */}
      <div className="w-[10%] bg-white p-2 overflow-y-auto space-y-4 border-l">
        {relatedImages.map((img) => (
          <div
            key={img.id}
            onClick={() =>
              navigate(`/chat/${img.id}`, {
                state: { image: img },
              })
            }
            className="cursor-pointer shadow hover:shadow-lg rounded-lg overflow-hidden border hover:bg-blue-50 transition"
          >
            <img
              src={img.download_url}
              alt={img.author}
              className="w-full h-20 object-cover"
            />
            <div className="p-1 text-center">
              <div className="font-semibold text-xs truncate">{img.author}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chat;
