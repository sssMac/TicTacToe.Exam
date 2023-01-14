import React, {useEffect, useRef, useState} from 'react';
import Message from "./Message";
import ActionPanel from "./ActionPanel";
import "../../Styles/Chat/Chat.css"
const Chat = (props) => {
    const [chatHistory, setChatHistory] = useState([])
    const latestChat = useRef(null);
    latestChat.current = chatHistory;

    useEffect(() => {
        if (props.connection) {
            props.connection.on("ReceiveGroupMessage", (message) => {
                const updatedChat = [...latestChat.current];
                updatedChat.push(message);
                setChatHistory(updatedChat);
            });
        }
    }, [props.connection]);
    return (
        <div className="chat logged">
            <div className="messages_wrapper">
                <div className="chatinfo">
                    <div className="name">Game chat</div>
                    <div className="members">Talk with spectators</div>
                </div>
                <div className="messages">
                    {
                        chatHistory ? chatHistory
                                .sort((a,b) => b.publishDate - a.publishDate)
                                .map(mess =>{
                                    return(
                                        <Message key={mess.messageId} mess={mess}/>
                                    )
                                }) :
                            true
                    }
                </div>
                <ActionPanel />
            </div>
        </div>
    );
};

export default Chat;