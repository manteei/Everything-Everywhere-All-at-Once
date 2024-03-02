import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ALL_PERSON, MY_FRIENDS, REQ} from '../../service/reducer/const';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import AddIcon from "@mui/icons-material/Add";

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
    const [friends, setFriends] = useState([]);
    const [requestFriends, setRequested] = useState({});

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }}, []);

    useEffect(() => {
        axios.get(REQ, { headers })
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    const handleAddRequest = (name) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios.post(REQ, { name: name }, { headers})
            .then(() => {
                setRequested(prevState => ({
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
        window.location.href = '/profile/messages';
    };

    return (
        <div className={classes.friendsContainer}>
            <div style={{ display: 'flex', marginBottom: '10px' }}>
                <Button component={Link} to="/profile/myFriends" variant="outlined"  style={{ marginRight: '10px' }}>Мои друзья</Button>
                <Button component={Link} to="/profile/allPerson" variant="outlined" style={{ marginRight: '10px' }}>Люди</Button>
                <Button>Заявки</Button>
            </div>
            <List>
                {friends.map(friend => (
                    <ListItem key={friend.name} className={classes.listItem}  style={{ marginRight: '40px' }}>
                        <ListItemText primary={friend.friend} style={{ marginRight: '40px' }}/>
                        <div className={classes.buttonGroup}>
                            <Button onClick={() => handleAddRequest(friend.friend)} variant="outlined"  disabled={requestFriends[friend.friend]}>
                                <AddIcon style={{ marginRight: '20px' }} />
                                {requestFriends[friend.friend] ?  'Заявка принята':'Принять заявку'}
                            </Button>
                            <Button onClick={() => handleMessageFriend(friend.friend)} variant="outlined">
                                <MessageIcon  style={{ marginRight: '20px' }}/>
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
