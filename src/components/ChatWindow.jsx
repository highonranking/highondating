import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const socket = io(BASE_URL); 

const ChatWindow = ({ connection, onClose }) => {
  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const loggedInUserId = user?._id; 

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/messages?userId1=${connection._id}&userId2=${loggedInUserId}`,
        { withCredentials: true }
      );
      setMessages(res.data.messages);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/messages`,
        {
          senderId: loggedInUserId,
          receiverId: connection._id,
          messageContent: newMessage,
        },
        { withCredentials: true }
      );

      console.log("Message sent:", res.data.message); 
      setMessages((prev) => [...prev, res.data.message]);
      setNewMessage(""); 
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  useEffect(() => {
    if (!connection?._id) return;

    socket.emit("join_room", connection._id);

    socket.on("new_message", (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.emit("leave_room", connection._id);
      socket.off("new_message");
    };
  }, [connection._id]);

  useEffect(() => {
    if (connection._id) {
      fetchMessages(); 
    }
  }, [connection._id]);

  return (
    <div className="fixed card rounded-xl inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full rounded-xl max-w-3xl bg-white shadow-lg">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-200 border-b">
          <h2 className="text-lg font-semibold">
            Chat with {connection.firstName} {connection.lastName}
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            ❌
          </button>
        </div>

        <div className="p-4 rounded-xl h-96 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => {
            const isSender = msg.senderId === loggedInUserId;

            return (
              <div
                key={idx}
                className={`flex items-end space-x-2 ${
                  isSender ? "justify-end" : ""
                }`}
              >
                {!isSender && (
                  <img
                    src={connection.photoUrl}
                    alt="Receiver"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`p-2 rounded-lg max-w-xs text-sm ${
                    isSender
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.messageContent}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center px-4 py-2 border-t bg-gray-50">
          <input
            type="text"
            required="true"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow px-4 py-2 mr-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          {newMessage && (
            <button
              onClick={sendMessage}
              className="px-4 py-2 btn-secondary font-semibold rounded-lg"
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
