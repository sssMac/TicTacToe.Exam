import React, {useState} from 'react';
import axios from "axios";
import UserService from "../../Services/user.service";

const ActionPanel = () => {
    const [inputText, setInputText] = useState("");

    const sendMessage = async () => {
        UserService.postMessage(localStorage.getItem('username'),inputText)
            .then(res => res)
        setInputText("");
    };
    return (
        <div className="message_input">
            <input className="chat_input" placeholder="Enter message" onKeyDown="SendChatMessage()"/>
            <div className="send_button" onClick={sendMessage}><i className="fa-regular fa-paper-plane"></i></div>
        </div>
    );
};

export default ActionPanel;