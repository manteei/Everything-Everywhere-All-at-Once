import React from 'react';
import {IconButton} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CustomButton from "../../../stories/CustomButton";
import {useNavigate} from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';


function TopBar(props) {
    const navigate = useNavigate()

    return (
        <div>
            <div style={{display: "flex", alignItems: "center", justifyContent:"space-between", padding:"10px 25px 0 25px"}}>
                <div style={{display: "flex", alignItems:"center"}}>
                    <IconButton onClick={() => {
                        localStorage.clear()
                        navigate("/login")
                    }}><ArrowBackIosIcon
                        sx={{color: "pink"}}/></IconButton>
                    <div style={{
                        fontWeight: "bold",
                        color: "pink",
                        fontSize: 20
                    }}>{localStorage.getItem("user")}</div>
                </div>
                <div>
                    <CustomButton icon={<DeleteOutlineIcon/>} action={props.deleteAll} title={"Очистить историю"}/>
                </div>
            </div>
        </div>
    );
}

export default TopBar;