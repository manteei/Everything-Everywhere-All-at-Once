import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {MY_FRIENDS, PROF} from '../../service/reducer/const';
import {Typography, IconButton, TextField, Link, Button} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles({
    friendsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '48px',
        width: '450px',
        margin: '0 auto',
        border: '2px solid pink',
        borderRadius: '20px',
        marginBottom: '10px',
        marginTop: '50px'
    },
    listItem: {
        display: 'flex',
        justifyContent: 'center',
        width: '15%',
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

function Profile() {
    const classes = useStyles();
    const [userData, setUserData] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login'; // Перенаправление на страницу входа, если токен отсутствует
        } else {
            const headers = {
                Authorization: `Bearer ${token}`,
            };
            axios.get(PROF, {headers})
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
        setNewName(userData.nick);
    };

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNavigateToFriends = () => {
        window.location.href = '/profile/myFriends';
    };
    const handleExit = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    const handleNavigateToOrders = () => {
        window.location.href = '/profile/incidents';
    };
    const handleGetTask = () => {
        window.location.href = '/profile/moving/task';
    };
    const handleNavigateToQuestionnaire = () =>{
        window.location.href = '/profile/questionnaire'
    };

    const handleMessages = () =>{
        window.location.href = '/profile/dialogs'
    };
    const handleSaveClick = () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios.post(PROF, { name: newName }, { headers })
            .then(response => {
                setUserData(response.data);
                setEditMode(false);
                axios.get(PROF, { headers })
                    .then(response => {
                        setUserData(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching updated user data:', error);
                    });
            })
            .catch(error => {
                console.error('Error updating user data:', error);
            });
    };

    return (
        <div>
        <div className={classes.friendsContainer}>
            {userData && (
                <div>
                <div>
                    <div>
                        <Typography className={classes.userInfo}>
                        Имя пользователя: {editMode ?
                        <TextField
                            value={newName}
                            onChange={handleNameChange}
                            variant="outlined"
                            size="small"
                        /> :
                        userData.nick
                    }
                    </Typography>
                    <Typography className={classes.userInfo}>Друзья: {userData.countFriends}</Typography>
                        {localStorage.getItem('role') === "Герой" ?(
                    <Typography className={classes.userInfo}>Скилл: {userData.skill}</Typography>
                        ):null}
                    </div>
                    <div>{!editMode && (
                        <IconButton onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                    )}
                    {editMode && (
                        <Button onClick={handleSaveClick} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                            Сохранить
                        </Button>
                    )}
                    </div>

                </div>
                </div>
            )}
        </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'50px'}}>
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleNavigateToFriends} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        Перейти к друзьям
                    </Button>
                </div>
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleNavigateToOrders} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        К доске заказов
                    </Button>
                </div>
                {localStorage.getItem('role') === "Герой" ?(
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleGetTask} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        Получить задание
                    </Button>
                </div>
                ):null}
                    {localStorage.getItem('role') === "Герой" ?(
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleNavigateToQuestionnaire} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        К анкете
                    </Button>
                </div>
                    ):null}

                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleExit} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        Выход
                    </Button>
                </div>
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleMessages} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        К сообщениям
                    </Button>
                </div>
            </div>

        </div>


);
}

export default Profile;
