import React, {useState} from 'react';
import TextField from '@mui/material/TextField';
import {withStyles} from "@mui/styles";
import {Icon} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {checkInputNumber, checkInputText} from "../service/functions/validation";


const TextInputCustom = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'gray',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#ff9fb0',
        }
    },
})(TextField);

function TextInput(props) {
    const [type, setType] = useState(props.type)

    const condition = props.type === "number" ? checkInputNumber(props.value, props.min, props.max) :
        checkInputText(props.value, props.min, props.max)

    return (
        <div style={{padding: props?.p}}>
            <TextInputCustom type={type} error={condition}
                             helperText={condition ? props.help : null}
                             variant={"standard"} style={{border: 'none'}}
                             value={props.value} fullWidth
                             onChange={(e) => props.setValue(e.target.value)}
                             label={props.label}
                             InputProps={props.password ? {
                                 endAdornment: props.value && <Icon onClick={() =>
                                     setType(type === "password" ? "text" : "password")
                                 } style={{marginRight: 10, cursor: "pointer", color: "pink"}}>
                                     {type === "text" ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                 </Icon>
                             } : null}>
            </TextInputCustom>
        </div>
    );
}

export default TextInput;