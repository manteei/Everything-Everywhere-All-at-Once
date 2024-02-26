import React from 'react';
import Typography from "@mui/material/Typography";

function Header(props) {
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <Typography style={{color: "white", fontWeight: "bold", fontSize: 18}}>{props.label}</Typography>
        </div>
    );
}

export default Header;