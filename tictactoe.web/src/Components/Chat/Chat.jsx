import React, {useEffect, useRef, useState} from 'react';
import Message from "./Message";
import ActionPanel from "./ActionPanel";
import "../../Styles/Chat/Chat.css"
const Chat = (props) => {
    const [chatHistory, setChatHistory] = useState([{
        messageId: "000000-0000-0000-0000-000000001",
        from: "SERVER",
        to: "koyash",
        text: "Правила: 1) первый ходит хост, он же крестик 2) не обновлять страницу 3) вы ноль",
        publishDate: 1673675682764}])
    const latestChat = useRef(null);
    latestChat.current = chatHistory;

    useEffect(() => {
        if (props.connection) {
            props.connection.on("ReceiveGroupMessage", (message) => {
                console.log(message)
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