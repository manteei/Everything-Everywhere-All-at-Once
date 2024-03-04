import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import {MY_FRIENDS, PROF} from '../../service/reducer/const';
import {Typography, List, ListItem, ListItemText, Button, IconButton} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import MessageIcon from '@mui/icons-material/Message';

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
    const navigate = useNavigate()
    const [friends, setFriends] = useState([]);
    const [deletedFriends, setDeletedFriends] = useState({});

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }}, []);

    useEffect(() => {
        axios.get(MY_FRIENDS, { headers })
            .then(response => {
                setFriends(response.data);
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
        axios.delete(MY_FRIENDS, { headers, data })
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

    const handleMessageFriend = (friendName) => {
        localStorage.setItem('selectedFriend', friendName);
       navigate('/profile/messages');
    };


    return (
        <div className={classes.friendsContainer}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <Button style={{ marginRight: '10px' }}>Мои друзья</Button>
                <Button component={Link} to="/profile/allPerson" variant="outlined" style={{ marginRight: '10px' }}>Люди</Button>
                <Button component={Link} to="/profile/requests" variant="outlined">Заявки</Button>
            </div>
            <List>
                {friends.map(friend => (
                    <ListItem key={friend.name} className={classes.listItem}  style={{ marginRight: '40px' }}>
                        <ListItemText primary={friend.friend} style={{ marginRight: '40px' }}/>

                        <div className={classes.buttonGroup}>
                            <Button onClick={() => handleRemoveFriend(friend.friend)} variant="outlined" disabled={deletedFriends[friend.friend]} style = {{marginLeft: 'auto', marginRight: '0', float: 'right', width: '200px', display: 'block'}}>
                                <DeleteIcon style={{ verticalAlign: 'middle', marginRight: '10px'}} />
                                {deletedFriends[friend.friend] ? 'Друг удален' : 'Удалить из друзей'}
                            </Button>
                            <Button onClick={() => handleMessageFriend(friend.friend)} variant="outlined" style = {{marginLeft: 'auto', marginRight: '0', float: 'right', width: '200px', display: 'block'}}>
                                <MessageIcon style={{ verticalAlign: 'middle', marginRight: '10px'}}/>
                                Написать сообщение
                            </Button>
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
