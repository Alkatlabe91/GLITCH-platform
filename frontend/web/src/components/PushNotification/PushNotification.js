import React, { useEffect, useState } from "react";
import { useSocket } from "../SocketContext/SocketContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PushNotification = () => {
  const socket = useSocket();
  const [displayedMessages, setDisplayedMessages] = useState(new Set());

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (message) => {
      try {
        if (displayedMessages && !displayedMessages.has(message.message)) {
          toast(message.message);
          setDisplayedMessages(prev => new Set(prev).add(message.message));
        }
      } catch (error) {
        console.error(error);
      }
     
    });

    return () => {
      socket.off("notification");
    };
  }, [socket, displayedMessages]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default PushNotification;
