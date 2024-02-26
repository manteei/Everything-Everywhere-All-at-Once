import React from 'react';
import Button from "@mui/material/Button";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    button: {
        borderRadius: "15px !important",
        color: "#ff9fb0 !important",
        border: "2px solid pink !important",
        "&:hover": {
            borderColor:"#ff9fb0 !important",
            color:"#ff9fb0 !important",
            background:"white !important"
        }
    },
    buttonDisabled: {
        borderRadius: "15px !important",
        color: "gray !important",
        border: "2px solid gray !important",
    }
});

function CustomButton(props) {
    const classes = useStyles()

    return (
        <div style={{padding: props?.p}}>
            <Button onClick={props?.action}
                    style={{width:props.w, height:props.h}}
                    className={props?.disabled ? classes.buttonDisabled : classes.button}
                    startIcon={props?.icon}
                    disabled={props?.disabled}
                    variant={"outlined"}>{props.title}</Button>
        </div>
    );
}

export default CustomButton;