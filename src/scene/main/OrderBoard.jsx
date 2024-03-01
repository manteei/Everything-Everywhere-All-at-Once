import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ALL_PERSON, INC, MY_FRIENDS, PROF, RESULT, TASKS} from '../../service/reducer/const';
import {Typography, List, ListItem, ListItemText, Button, Select, MenuItem} from '@mui/material';
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
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [coordinatorNames, setCoordinatorNames] = useState({});
    const [taskTaken, setTaskTaken] = useState({});
    const [showInput, setShowInput] = useState(false); // Состояние для отображения поля ввода
    const [coordinates, setCoordinates] = useState(null);
    const [selectedCoordinator, setSelectedCoordinator] = useState('');

    const [coordinators, setCoordinators] = useState([]);
    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        axios.get(ALL_PERSON, { headers })
            .then(response => {
                setCoordinators(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }
    }, [token]);

    useEffect(() => {
        axios.get(INC, { headers })
            .then(response => {
                setTasks(response.data);

            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    const handleInputChange = (event, taskId) => {
        const { value } = event.target;
        setCoordinatorNames(prevState => ({
            ...prevState,
            [taskId]: value
        }));
    };

    const handleSelectChange = (event) => {
        setSelectedCoordinator(event.target.value);
    };


    const handleSubmit = (id, name) => {
        axios.post(INC, { id, name }, { headers })
            .then(response => {
                setTaskTaken(prevState => ({
                    ...prevState,
                    [id]: true
                }));

                setShowInput(false); // После отправки формы скрываем поле ввода
                setCoordinates(response.data);
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    const chooseOrder = (taskId) => {
        setSelectedTaskId(taskId);
        setShowInput(true); // Показываем поле ввода при выборе задания
    };

    return (
        <div className={classes.friendsContainer}>
            {coordinates && (
                <div>
                <div>Информация о координатах вашего монстра</div>
                <div className={classes.listItem} style={{ marginBottom: '40px', alignItems: 'center' }}>
                    <ul>
                        {coordinates.map(coord => (
                            <li key={coord.name}>
                                <p>Название галактики: {coord.name}</p>
                                <p>Долгота: {coord.longitude}</p>
                                <p>Широта: {coord.latitude}</p>
                                <p>Координата Y: {coord.coordinatey}</p>
                                <p>Координата X: {coord.coordinatex}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
            )}
            Доступные заказы:
            <List>
                {tasks.map(task => (
                    <ListItem key={task.id} className={classes.listItem} style={{ marginRight: '40px' }}>
                        Монстр: <ListItemText primary={task.name} style={{ marginRight: '40px', alignItems: 'center' }} />
                        id: <ListItemText primary={task.id} style={{ marginRight: '40px', alignItems: 'center' }} />
                        уровень: <ListItemText primary={task.level} style={{ marginRight: '40px', alignItems: 'center' }} />
                        цена: <ListItemText primary={task.price} style={{ marginRight: '40px', alignItems: 'center' }} />
                        {showInput && selectedTaskId === task.id ? (
                            <div><Select
                                value={selectedCoordinator}
                                onChange={(event) => handleInputChange(event, task.id)}
                            >
                                <MenuItem value="" disabled>
                                    Выберите имя координатора
                                </MenuItem>
                                {coordinators.map((coordinator, index) => (
                                    <MenuItem key={index} value={coordinator.friend}>{coordinator.friend}</MenuItem>
                                ))}
                            </Select>
                                <Button onClick={() => handleSubmit(task.id, coordinatorNames[task.id])} variant="outlined">
                                    Сохранить
                                </Button>
                            </div>
                        ) : (
                            localStorage.getItem('role') === "Герой" && (
                            <Button onClick={() => chooseOrder(task.id)} variant="outlined" disabled={taskTaken[task.id]}>
                                <AddIcon style={{ marginRight: '20px' }} />
                                {taskTaken[task.id] ? 'Задание взято' : 'Взять задание'}
                            </Button>
                                )
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
