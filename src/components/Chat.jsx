import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utills/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utills/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const user = useSelector((state) => state.user);
    const userId = user?._id;

    const fetchChatHistory = async () => {
        try{
            const res = await axios.get(BASE_URL + "/chat/history/" + targetUserId, 
                {
                    withCredentials: true,
                }
            );
            
            const chatMessages = res?.data.messages.map(mes => {
                return {
                    firstName: mes.senderId.firstName,
                    text: mes.text,
                    time: mes.updatedAt
                }
            });
            console.log(chatMessages)
            setMessages(chatMessages);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchChatHistory();
    },[])

    useEffect(() => {
        if(!userId){
            return;
            console.log(`not available`);
        }else{
            console.log(`available`, userId)
        }
        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName: user.firstName, userId, targetUserId });
        
        socket.on("messageReceived", ({ firstName, text }) => {
            console.log(firstName, text);
            setMessages((messages) => [...messages, { firstName, text }]);
        })

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            userId,
            targetUserId,
            text: newMessage
        })
    }

  return (
    <div className="w-1/2 mx-auto border border-grey-600 m-5 h-[70vh] flex flex-col">
        <h1 className="p-5 border-b border-grey-600 text-center">Chat with {user.firstName}</h1>
        <div className="flex-1 overflow-y-auto p-5">
            {
                messages.map((message, index) => {
                    const date = new Date(message.time);
                    const options = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false };
                    const formattedDate = date.toLocaleString("en-GB", options).replace(",", "");
                    return (
                        <div key={index} className={(user.firstName === message.firstName) ? "chat-start": "chat-end" }>
                            <div className="chat-header">
                                {message.firstName}
                                <time className="text-xs opacity-50">{formattedDate}</time>
                            </div>
                            <div className="chat-bubble">{message.text}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    );
                })
            }
        </div>
        <div className="p-5 border-t border-grey-600 flex items-center justify-between">
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message" className="w-3/4 p-2 border border-grey-600 rounded-lg" />
            <button className="btn btn-primary" onClick={sendMessage}>Send</button>
        </div>
    </div>
  )
}

export default Chat