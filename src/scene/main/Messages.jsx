import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {MESSAGES} from "../../service/reducer/const";

const useStyles = makeStyles({
    messageContainer: {
        width: '30%',
        margin: '0 auto',
        marginBottom: '10px',
        padding: '8px',
        borderRadius: '8px',
        textAlign: 'right'
    },
    pinkMessage: {
        backgroundColor: 'lightpink',
        borderRadius: '20px',
    },
    blueMessage: {
        border: '2px solid pink',
        borderRadius: '20px',
        marginBottom: '10px',
        textAlign: 'left',
    },
});
const MessageHistory = ({ name }) => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const selectedFriend = localStorage.getItem('selectedFriend');
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        axios.post(MESSAGES, {  name : selectedFriend }, { headers})
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching message history:', error);
            });
    }, [name]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>{selectedFriend}</h2>
            </div>
            {messages.map((message, index) => (
                <div key={index} className={`${classes.messageContainer} ${message.name === localStorage.getItem('user') ? classes.blueMessage : classes.pinkMessage}`}>
                    <div>
                        {message.content}
                    </div>
                    <div style={{ fontSize: 'small', color: 'gray' }}>
                        {new Date(message.time1).toLocaleString()} {/* Преобразование строки времени в формат, понятный для пользователя */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MessageHistory;
