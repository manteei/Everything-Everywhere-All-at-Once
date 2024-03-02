import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ALL_PERSON, MY_FRIENDS} from '../../service/reducer/const';
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
    const [friends, setFriends] = useState([]);
    const [addedFriends, setAddedFriends] = useState({});

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }}, []);

    useEffect(() => {
        axios.get(ALL_PERSON, { headers })
            .then(response => {
                setFriends(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    const handleAddFriend = (name) => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios.post(ALL_PERSON, { name: name }, { headers})
            .then(() => {
                setAddedFriends(prevState => ({
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
            <Button component={Link} to="/profile/myFriends" variant="outlined"  style={{ marginRight: '10px' }} >Мои друзья</Button>
            <Button style={{ marginRight: '10px' }}>Люди</Button>
            <Button component={Link} to="/profile/requests" variant="outlined">Заявки</Button>
            </div>
            <List>
                {friends.map(friend => (
                    <ListItem key={friend.name} className={classes.listItem} style={{ marginRight: '40px' }}>
                        <ListItemText primary={friend.friend} style={{ marginRight: '40px' }} />
                        <div className={classes.buttonGroup}>
                            <Button onClick={() => handleAddFriend(friend.friend)} variant="outlined"  disabled={addedFriends[friend.friend]} style = {{marginLeft: 'auto', marginRight: '0', float: 'right', width: '200px', display: 'block'}}>
                                <AddIcon style={{ verticalAlign: 'middle', marginRight: '10px'}} />
                                {addedFriends[friend.friend] ? 'Друг добавлен' : 'Добавить в друзья'}
                            </Button>
                            <Button onClick={() => handleMessageFriend(friend.friend)} variant="outlined" style = {{marginLeft: 'auto', marginRight: '0', float: 'right', width: '200px', display: 'block'}}>
                                <MessageIcon  style={{ verticalAlign: 'middle', marginRight: '10px'}}/>
                                Перейти к диалогу
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
