import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {PROF, QUESTIONNAIRE} from '../../service/reducer/const';
import {List, ListItem, ListItemText, Button } from '@mui/material';
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
    const [editMode, setEditMode] = useState(false);
    const [editedTasks, setEditedTasks] = useState([]);

    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }
    }, [token]);

    useEffect(() => {
        axios.get(QUESTIONNAIRE, { headers })
            .then(response => {
                setTasks(response.data);
                setEditedTasks(response.data.map(task => ({ ...task })));
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = () => {
        console.log('Saving changes:', editedTasks);
        setEditMode(false);
        axios.post(QUESTIONNAIRE, editedTasks, {headers})
          /*  .then(() => {
                axios.get(QUESTIONNAIRE, { headers })
                    .then(response => {
                        setTasks(response.data);
                        setEditedTasks(response.data.map(task => ({ ...task })));
                    })
                    .catch(error => {
                        console.error('Error fetching friends data:', error);
                    });
            })*/
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const handleMasteryChange = (index, event) => {
        const newEditedTasks = [...editedTasks];
        newEditedTasks[index].mastery_percentage = parseInt(event.target.value) || 0;
        setEditedTasks(newEditedTasks);
    };

    return (
        <div className={classes.friendsContainer}>
            Ваши навыки:
            {!editMode && (
                <Button onClick={handleEditClick} className={classes.editButton}>
                    Изменить
                </Button>
            )}
            <List>
                {tasks.map((task, index) => (
                    <ListItem key={task.title} className={classes.listItem}>
                        <ListItemText primary={task.title} />
                        {editMode ? (
                            <TextField
                                value={editedTasks[index].mastery_percentage}
                                onChange={(event) => handleMasteryChange(index, event)}
                                variant="outlined"
                                size="small"
                            />
                        ) : (
                            <div>{task.mastery_percentage}%</div>
                        )}
                    </ListItem>
                ))}
            </List>
            {editMode && (
                <Button onClick={handleSaveClick} className={classes.saveButton}>
                    Сохранить
                </Button>
            )}
            <Button component={Link} to="/profile" className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                Вернуться к профилю
            </Button>
        </div>
    );
}

export default FriendsPage;