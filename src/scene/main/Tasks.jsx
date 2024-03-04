import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {ALL_PERSON, MY_FRIENDS, RESULT, TASKS} from '../../service/reducer/const';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = makeStyles({
    friendsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '48px',
        width: '450px',
        margin: '0 auto',
    },
    listItem: {
        width: '100%',
        border: '2px solid pink',
        borderRadius: '20px',
        marginBottom: '10px',
    },
    buttonGroup: {
        display: 'flex',
        gap: '10px',
    },
    returnButton: {
        marginTop: '20px',
        background: 'pink',
        color: 'white',
        borderRadius: '20px',
        padding: '10px 20px',
        '&:hover': {
            background: 'lightpink',
        },
    },
});


function FriendsPage() {
    const classes = useStyles();
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }}, []);

    useEffect(() => {
        axios.get(TASKS, { headers })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    const handleSendDone = () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios.post(RESULT, { name: "Done" }, { headers})
            .then(() => {
                navigate('/profile');
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };
    const handleSendNotDone = () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios.post(RESULT, { name: "NotDone" }, { headers})
            .then(() => {
                navigate('/profile');
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    
    return (
        <div className={classes.friendsContainer}>
            <h2>Ваши задания для получения навыка:</h2>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.name} className={classes.listItem} style={{ marginRight: '40px' }}>
                        <ListItemText primary={task.name} style={{ marginRight: '40px', alignItems: 'center' }} />
                    </ListItem>
                ))}
            </List>
            <Button onClick={() => handleSendDone()} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
               Я выполнил задание!
            </Button>
            <Button onClick={() => handleSendNotDone()} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                У меня не получилось :(
            </Button>
            <Button component={Link} to="/profile" className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                Вернуться к профилю
            </Button>
        </div>
    );
}

export default FriendsPage;
