import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {HISTORY, MESSAGES, REQ, SEND} from "../../service/reducer/const";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    messageContainer: {
        width: '30%',
        margin: '0 auto',
        marginBottom: '10px',
        padding: '8px',
        borderRadius: '8px',
        textAlign: 'right'
    },
    blueMessage: {
        backgroundColor: 'lightpink',
        borderRadius: '20px',
    },
    pinkMessage: {
        border: '2px solid pink',
        borderRadius: '20px',
        marginBottom: '10px',
        textAlign: 'left',
    },
    textField : {
        border: '2px solid pink',
        borderRadius: '20px',
        width: "400px"
    },
});
const MessageHistory = ({ name }) => {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const myName = localStorage.getItem('user')

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

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

    const handleSubmitMessage = (name) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        setMessage("")

        axios.post(SEND, { name: selectedFriend, text: message}, { headers})
            .then(() => {
                axios.post(MESSAGES, {  name : selectedFriend }, { headers})
                    .then(response => {
                        setMessages(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching message history:', error);
                    });
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>{selectedFriend}</h2>
            </div>
            {messages.map((message, index) => (
                <div key={index} className={`${classes.messageContainer} ${message.name === myName ? classes.blueMessage : classes.pinkMessage}`}>
                    <div>
                        {message.content}
                    </div>
                    <div style={{ fontSize: 'small', color: 'gray' }}>
                        {new Date(message.time1).toLocaleString()} {/* Преобразование строки времени в формат, понятный для пользователя */}
                    </div>
                </div>
            ))}
            <div className = {classes.messageContainer}>
            <TextField
                className ={classes.textField}
                label="Введите сообщение"
                variant="outlined"
                value={message}
                onChange={handleMessageChange}
                style = {{ borderRadius: '20px'}}
            />
            <Button variant="outlined" onClick={handleSubmitMessage} style = {{marginTop: '15px'}}>
                Отправить
            </Button>
                <Button component={Link} to="/profile"  style={{ width: 200, padding: 8, display: 'block', margin: '0 auto' }}>
                    Вернуться к профилю
                </Button>
                <Button component={Link} to="/profile/myFriends"  style={{ width: 200, padding: 8,display: 'block', margin: '0 auto', }}>
                    К друзьям
                </Button>
                <Button component={Link} to="/profile/dialogs"  style={{ width: 200, padding: 8,display: 'block', margin: '0 auto', }}>
                    К диалогам
                </Button>
            </div>

        </div>

    );
}

export default MessageHistory;
