import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ADD_INC, ALL_PERSON, INC, MY_FRIENDS, PROF, RESULT, TASKS, TECH_INC} from '../../service/reducer/const';
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
    const [taskTaken, setTaskTaken] = useState({});

    useEffect(() => {
        axios.get(TECH_INC, { headers })
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }}, []);

    const orderDone = (id) => {
        axios.post(TECH_INC, { id, name: "Done" }, { headers })
            .then(response => {
                setTaskTaken(prevState => ({
                    ...prevState,
                    [id]: true
                }));

            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    }


const orderNotDone = (id) => {
    axios.post(TECH_INC, { id, name: "NotDone" }, { headers })
        .then(response => {
            setTaskTaken(prevState => ({
                ...prevState,
                [id]: true
            }));
        })
        .catch(error => {
            console.error('Error updating user data:', error);
        });
};

    return (
        <div className={classes.friendsContainer}>
           Заказы в работе:
            <List>
                {tasks.map(task => (
                    <ListItem key={task.name} className={classes.listItem} style={{ marginRight: '40px' }}>
                        id:
                        <ListItemText primary={task.order_id} style={{ marginRight: '40px', alignItems: 'center' }} />
                        герой:
                        <ListItemText primary={task.hero} style={{ marginRight: '40px', alignItems: 'center' }} />
                        координатор:
                        <ListItemText primary={task.coordinator} style={{ marginRight: '40px', alignItems: 'center' }} />
                        <Button onClick={() => orderDone(task.order_id)} variant="outlined" style={{ marginRight: '20px' }} disabled={taskTaken[task.order_id]} >
                            Выполнен!
                        </Button>
                        <Button onClick={() => orderNotDone(task.order_id)} variant="outlined" disabled={taskTaken[task.order_id]}>
                            Не выполнен :(
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
