import React, {useState} from 'react';
import axios from "axios";
import UserService from "../../Services/user.service";
import {useParams} from "react-router-dom";

const ActionPanel = () => {
    const { host } = useParams()
    const [inputText, setInputText] = useState("");

    const sendMessage = async () => {
        UserService.postMessage(localStorage.getItem('username'), inputText, host)
            .then(res => res)
        setInputText("");
    };
    return (
        <div className="message_input">
            <input className="chat_input" placeholder="Enter message" value={inputText} onChange={e => setInputText(e.target.value)}/>
            <div className="send_button" onClick={sendMessage}><i className="fa-regular fa-paper-plane"></i></div>
        </div>
    );
};

export default ActionPanel;