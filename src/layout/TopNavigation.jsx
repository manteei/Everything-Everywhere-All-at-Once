import React from 'react';
import Header from "./components/Header";
import {makeStyles} from "@mui/styles";
import FavoriteIcon from '@mui/icons-material/Favorite';
import logo from '../assets/logoAll.jpg';

const useStyles = makeStyles({
    header: {
        overflow: "hidden",
        background: "#ff9fb0",
        height: "60px",
        width: "100%",
    },
    headerContainer: {
        display: "grid",
        alignItems: "center",
        gridTemplateColumns: "30%  1fr 30%",
        "@media screen and (max-width:720px)": {
            gridTemplateColumns: "50px  1fr 50px",
        },
    },
    variant: {
        marginLeft:8,
        display: "flex",
        alignItems: 'center',
        height: "60px",
        "@media screen and (max-width:720px)": {
            display: "none",
        },
    }
})

function TopNavigation() {
    const classes = useStyles()

    return (
        <div className={classes.header}>
            <div className={classes.headerContainer}>
                <div style={{display: "flex", alignItems: 'center', height: "60px"}}>
                    <img style={{width: 50, height: 50}} src={logo}/>
                    <div className={classes.variant}>
                        <Header label={"Everything Everywhere All at Once"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopNavigation;