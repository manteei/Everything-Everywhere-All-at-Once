import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ALL_PERSON, MY_FRIENDS, RESULT, TASKS, TECHNICAL_TASKS} from '../../service/reducer/const';
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
});


function FriendsPage() {
    const classes = useStyles();
    const [tasks, setTasks] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [taskName, setTaskName] = useState('');

    const [deletedFriends, setDeletedFriends] = useState({});

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }}, []);

    useEffect(() => {
        axios.get(TECHNICAL_TASKS, { headers })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    const handleRemoveFriend = (name) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const data = {
            name: name
        };
        axios.delete(TECHNICAL_TASKS, { headers, data })
            .then(() => {
                setDeletedFriends(prevState => ({
                    ...prevState,
                    [name]: true
                }));
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    const addTask = () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios.post(TECHNICAL_TASKS, { name: taskName }, { headers})
            .then(() => {
                setShowInput(false);
                setShowButton(true);
                setTaskName('');
                axios.get(TECHNICAL_TASKS, { headers })
                    .then(response => {
                        setTasks(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching friends data:', error);
                    });
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };


    return (
        <div className={classes.friendsContainer}>
            Задания:
            <div>
                {!showInput && showButton && ( // Показываем кнопку, если не отображается поле ввода и showButton равно true
                    <Button onClick={() => setShowInput(true)} className={classes.returnButton}>
                        Добавить задание
                    </Button>
                )}
                {showInput && ( // Показываем поле ввода, если showInput равно true
                    <div>
                        <TextField
                            label="Введите название задания"
                            value={taskName}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <Button onClick={addTask} style = {{marginLeft: 'auto', marginRight: '0', float: 'right', width: '200px', display: 'block'}}>
                            Добавить
                        </Button>
                    </div>
                )}
            </div>
            <List>
                {tasks.map(task => (
                    <ListItem key={task.name} className={classes.listItem} style={{ marginRight: '40px' }}>
                        <ListItemText primary={task.name} style={{ marginRight: '40px', alignItems: 'center' }} />
                        <Button
                            onClick={() => handleRemoveFriend(task.name)}
                            variant="outlined"
                            disabled={deletedFriends[task.name]}
                            style={{ fontSize: "medium" }}
                        >
                            <DeleteIcon style={{ marginRight: '20px' }} />
                            {deletedFriends[task.name] ? 'Задание удалено' : 'Удалить'}
                        </Button>
                    </ListItem>
                ))}
            </List>
            <Button component={Link} to="/work" className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                Вернуться к профилю
            </Button>

        </div>
    );
}

export default FriendsPage;
