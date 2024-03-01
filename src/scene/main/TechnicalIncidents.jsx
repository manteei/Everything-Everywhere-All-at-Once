import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {ADD_INC, ALL_PERSON, MONSTERS, UNIVERSALS} from '../../service/reducer/const';
import {Button, MenuItem, Select} from '@mui/material';
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

    const [monster, setMonster] = useState('');
    const [universe, setUniverse] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [monsters, setMonsters] = useState([]);
    const [universals, setUniversals] = useState([]);


    const token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    useEffect(() => {
        if (!token) {
            window.location.href = '/login';
        }}, []);

    useEffect(() => {
        axios.get(MONSTERS, { headers })
            .then(response => {
                setMonsters(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(UNIVERSALS, { headers })
            .then(response => {
                setUniversals(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends data:', error);
            });
    }, []);

    const handleSubmit = () => {
        axios.post(ADD_INC, { monster: monster, nameUniversal : universe, longitude : longitude, latitude :  latitude}, { headers })
            .catch(error => {
                console.error('Error updating user data:', error);
            });

        setMonster('');
        setUniverse('');
        setLatitude('');
        setLongitude('');
    };

    return (
        <div className={classes.friendsContainer}>
           Добавить инцидент:
            <div>
                    <div>
                        <Select
                            label="Монстр"
                            value={monster}
                            onChange={(e) => setMonster(e.target.value)}
                            style={{marginRight: "20px",  marginTop: "20px",  width: "200px"}}
                        >
                            <MenuItem value="" disabled>
                                Выберите тип монстра
                            </MenuItem>
                            {monsters.map((monsters, index) => (
                                <MenuItem key={index} value={monsters.name}>{monsters.name}</MenuItem>
                            ))}
                        </Select>
                        <Select
                            label="Вселенная"
                            value={universe}
                            onChange={(e) => setUniverse(e.target.value)}
                            style={{marginRight: "20px",  marginTop: "20px",  width: "200px"}}
                        >
                            <MenuItem value="" disabled>
                                Выберите название вселенной
                            </MenuItem>
                            {universals.map((universals, index) => (
                                <MenuItem key={index} value={universals.name}>{universals.name}</MenuItem>
                            ))}
                        </Select>
                        <TextField
                            label="Широта"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                            style={{marginRight: "20px",  marginTop: "20px"}}
                        />
                        <TextField
                            label="Долгота"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                            style={{marginRight: "20px", marginTop: "20px", marginBottom: "20px"}}
                        />
                        <Button onClick={handleSubmit} variant="outlined">
                            Сохранить
                        </Button>
                    </div>
            </div>

            <Button component={Link} to="/work" className={classes.returnButton} style={{ width: 200, padding: 8 }}>
                Вернуться к профилю
            </Button>
        </div>
    );
}

export default FriendsPage;
