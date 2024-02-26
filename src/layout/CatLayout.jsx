import React from 'react';
import kitty from "../assets/hello_kitty_welcome.png";
import {makeStyles} from "@mui/styles";
import {Fade} from "@mui/material";

const useStyles = makeStyles({
    cat: {
        position: "relative",
        bottom: -10,
        width: 100,
        height: 100
    }
});

function CatLayout(props) {
    const classes = useStyles()

    return (
        <Fade in={true} timeout={750}>
            <div>
                <div style={{display: 'flex', justifyContent: "center"}}>
                    <img className={classes.cat} src={kitty}/>
                </div>
                {props.children}
            </div>
        </Fade>
    );
}

export default CatLayout;