import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ALL_PERSON, INC, MY_FRIENDS, PROF, RESULT, TASKS} from '../../service/reducer/const';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MessageIcon from "@mui/icons-material/Message";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

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
    const [tasks, setTasks] = useState([]);

    const [showInput, setShowInput] = useState(false);
    const [coordinatorName, setCoordinatorName] = useState('');

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }}, []);

    useEffect(() => {
        axios.get(INC, { headers })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);
    const handleInputChange = (event) => {
        setCoordinatorName(event.target.value);
    };

    const handleSubmit = (id) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios.post(INC, {id: id , name: coordinatorName }, { headers })
            .then(response => {

            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };
    const chooseOrder = () => {
        setShowInput(true);
    };

    return (
        <div className={classes.friendsContainer}>
            Доступные заказы:
            <List>
                {tasks.map(task => (
                    <ListItem key={task.name} className={classes.listItem} style={{ marginRight: '40px' }}>
                        Монстр:
                        <ListItemText primary={task.name} style={{ marginRight: '40px', alignItems: 'center' }} />
                         id:
                        <ListItemText primary={task.id} style={{ marginRight: '40px', alignItems: 'center' }} />
                         уровень:
                        <ListItemText primary={task.level} style={{ marginRight: '40px', alignItems: 'center' }} />
                         цена:
                        <ListItemText primary={task.price} style={{ marginRight: '40px', alignItems: 'center' }} />


                            <Button onClick={chooseOrder}  variant="outlined">
                                <AddIcon style={{ marginRight: '20px' }} />
                                Взять задание
                            </Button>
                            {showInput && (
                                <div>
                                    <TextField
                                        label="Введите имя координатора"
                                        value={coordinatorName}
                                        onChange={handleInputChange}
                                    />
                                    <Button onClick={handleSubmit(task.id)} variant="outlined">
                                        Сохранить
                                    </Button>
                                </div>
                            )}

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
