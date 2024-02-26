import React from 'react';
import {makeStyles} from "@mui/styles";
import TextInput from "../../../stories/TextInput";
import {FormControl, IconButton, InputLabel, MenuItem, Select, Slider} from "@mui/material";
import CustomButton from "../../../stories/CustomButton";
import RefreshIcon from '@mui/icons-material/Refresh';
import Fade from "@mui/material/Fade";
import FavoriteIcon from '@mui/icons-material/Favorite';
import kitty from "../../../assets/hello_kitty_welcome.png";

const useStyles = makeStyles({
    cardContainer: {
        margin: "15px 0 0 25px",
        width: "430px"
    },
    cardForm: {
        padding: "35px",
        background: "white",
        borderRadius: "25px",
        boxShadow: "0 5px 20px gray"
    }
});

function FormCustom(props) {
    const classes = useStyles()

    function reset() {
        props.setX("")
        props.setY("")
        props.setR("")
    }

    function handleSetPoint() {
        props.setPoint({
            x: Number(props.x),
            y: Number(props.y),
            r: Number(props.r),
        })
    }

    return (
        <div className={classes.cardContainer}>
            <Fade in={true} timeout={750}>
                    <div className={classes.cardForm}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <FormControl size={"small"} sx={{width: "100px", borderColor: "red !important"}}>
                                <InputLabel>X</InputLabel>
                                <Select value={props.x} onChange={(e) => props.setX(e.target.value)} label="X">
                                    <MenuItem value={-4}>-4</MenuItem>
                                    <MenuItem value={-3}>-3</MenuItem>
                                    <MenuItem value={-2}>-2</MenuItem>
                                    <MenuItem value={-1}>-1</MenuItem>
                                    <MenuItem value={0}>0</MenuItem>
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                            </FormControl>
                            <div style={{width: "190px", height: 60}}>
                                <TextInput value={props.y} setValue={props.setY} type={"number"} min={-3} max={3}
                                           help={"Y должен быть от -3 до 3"} label={"Y"}/>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: 16,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                            <FormControl size={"small"} sx={{width: "100px", borderColor: "red !important"}}>
                                <InputLabel>R</InputLabel>
                                <Select value={props.r} onChange={(e) => props.setR(e.target.value)} label="R">
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={2}>2</MenuItem>
                                    <MenuItem value={3}>3</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                    <MenuItem value={5}>5</MenuItem>
                                </Select>
                            </FormControl>
                            <div style={{
                                display: "flex",
                                width: "190px",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                                <CustomButton action={handleSetPoint}
                                    disabled={(props.x === "" || props.y === "" || props.r === "") || !(props.y > -3 && props.y < 3)}
                                    icon={<FavoriteIcon/>} title={"Отправить"}/>
                                <IconButton onClick={() => reset()}><RefreshIcon style={{color: "pink"}}/></IconButton>
                            </div>
                        </div>
                </div>
            </Fade>
        </div>
    );
}

export default FormCustom;