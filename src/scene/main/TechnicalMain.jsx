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


    const handleNavigateToFriends = () => {
        window.location.href = '/work/tasks'; // Перенаправление на страницу друзей
    };
    const handleExit = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };
    const handleToIncidents = () => {
        window.location.href = 'work/incidents/addIncidents'
    };

    const handleNavigateToIncidents =() => {
        window.location.href = 'work/incidents'
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'50px'}}>
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleNavigateToFriends} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        Перейти к заданиям
                    </Button>
                </div>
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleNavigateToIncidents} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        Заказы в работе
                    </Button>
                </div>
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleToIncidents} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        Инциденты
                    </Button>
                </div>
                <div className={classes.listItem} style = {{marginRight:'20px', marginLeft:'20px'}}>
                    <Button onClick={handleExit} className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                        Выход
                    </Button>
                </div>
            </div>

        </div>


    );
}

export default Profile;
