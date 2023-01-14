import React from 'react';

const Message = (props) => {
    return (
        <div className="message">
            <div className="text">
                <div className="sender">{props.mess.from}</div>
                <span>{props.mess.text}</span>
            </div>
        </div>

    );
};

export default Message;