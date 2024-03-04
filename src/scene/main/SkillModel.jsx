import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {ALL_PERSON, MODEL, MY_FRIENDS, RESULT, TASKS} from '../../service/reducer/const';
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
        axios.get(MODEL, { headers })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    return (
        <div className={classes.friendsContainer}>
            <h2>Ваши навыки в других вселенных:</h2>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.name} className={classes.listItem} style={{ display: 'flex', marginRight: '40px' }}>
                        <div>
                            <div style={{ marginTop : "1px", marginRight : "20px"}}>Навык:</div>
                            <div style={{ marginTop : "10px", marginRight : "20px"}}>Вселенная:</div>
                            <div style={{ marginTop : "10px", marginRight : "20px"}}>Уровень:</div>
                        </div>
                        <div>
                            <div><ListItemText primary={task.title} style={{ marginRight: '40px', alignItems: 'center' }} /></div>
                            <div><ListItemText primary={task.universal} style={{ marginRight: '40px', alignItems: 'center' }} /></div>
                            <div style={{ display: 'inline-flex' }}>
                                <div><ListItemText primary={task.mastery_percentage} style={{ alignItems: 'center' }}/></div>
                                <div style = {{marginLeft:'5px', marginTop: '7px'}}>%</div>
                            </div>
                        </div>
                    </ListItem>
                ))}
            </List>
            <Button component={Link} to="/profile" className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                Вернуться к профилю
            </Button>
        </div>
    );
}

export default FriendsPage;
