import React from 'react';
import TopNavigation from "./TopNavigation";
import LeftBar from "./components/LeftBar";
import RightBar from "./components/RightBar";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    container: {
        overflow:"hidden",
        background: "whitesmoke",
        width: "70%",
        "@media screen and (max-width:1115px)": {
            width: "100%",
        },
    }
})

function Layout(props) {
    const classes = useStyles()

    return (
        <div>
            <TopNavigation/>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LeftBar/>
                <div className={classes.container}>
                    {props.children}
                </div>
                <RightBar/>
            </div>
        </div>
    );
}

export default Layout;