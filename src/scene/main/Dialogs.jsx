import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ALL_PERSON, MESSAGES, MY_FRIENDS, REQ} from "../../service/reducer/const";
import MessageIcon from "@mui/icons-material/Message";
import {Button} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Link, useNavigate} from "react-router-dom";

const useStyles = makeStyles({
    listItem: {
        border: '2px solid pink',
        borderRadius: '20px',
        marginBottom: '10px',
        width: '20%',
        margin: '0 auto',
        padding: '8px',
        overflow: 'hidden', // Добавленное свойство
        display: 'flex', // Добавленное свойство
        alignItems: 'center', // Добавленное свойство
    }
});
const DialoguesPage = () => {
    const [dialogues, setDialogues] = useState([]);
    const classes = useStyles();
    const navigate = useNavigate()
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const handleMessageFriend = (friendName) => {
        localStorage.setItem('selectedFriend', friendName);
        navigate('/profile/messages');
    };

    useEffect(() => {
        const fetchDialogues = async () => {
            try {
                const peopleResponse = await  axios.get(ALL_PERSON, { headers })
                const friendsResponse = await axios.get(MY_FRIENDS, { headers })
                const requestsResponse = await axios.get(REQ, { headers })

                // Объединение всех списков в один массив диалогов
                const allDialogues = [
                    ...peopleResponse.data,
                    ...friendsResponse.data,
                    ...requestsResponse.data
                ];

                const dialoguesWithMessages = await Promise.all(allDialogues.map(async dialogue => {
                    try {
                        const messagesResponse = await axios.post(MESSAGES, {  name : dialogue.friend }, { headers});
                        if (messagesResponse.data.length === 0) {
                            return null;
                        }
                        return { ...dialogue, messages: messagesResponse.data };
                    } catch (error) {
                        console.error(`Ошибка при получении сообщений для ${dialogue.name}:`, error);
                        return dialogue;
                    }
                }));
                const filteredDialogues = dialoguesWithMessages.filter(dialogue => dialogue !== null);
                setDialogues(filteredDialogues);
            } catch (error) {
                console.error('Ошибка загрузки диалогов:', error);
            }
        };

        fetchDialogues();


    }, []);

    return (
        <div>
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <h2>Диалоги</h2>
            </div>
            {dialogues.map(dialogue => (
                <div key={dialogue.id } className={classes.listItem}>
                    {dialogue.friend}
                    {dialogue.messages && (
                        <Button onClick={() => handleMessageFriend(dialogue.friend)} variant="outlined"  style={{marginLeft: 'auto', marginRight: '0', float: 'right' , width : "200px", display: 'block'}}>
                            <MessageIcon style={{ verticalAlign: 'middle', marginRight: '10px'}}/>
                            <div>Перейти к диалогу</div>
                        </Button>
                    )}
                </div>

            ))}
        </div>
        <Button component={Link} to="/profile"  style={{ width: 200, padding: 8, display: 'block', margin: '0 auto' }}>
            Вернуться к профилю
        </Button>
        </div>

    );
}

export default DialoguesPage;
