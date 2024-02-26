import React from 'react';
import {IconButton} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import anime1 from "../../assets/anime.gif";
import anime2 from "../../assets/anime2.gif";
import anime3 from "../../assets/anime3.gif";
import anime4 from "../../assets/anime4.gif";
import {makeStyles} from "@mui/styles";
import {connect} from "react-redux";
import {setLeftGirl} from "../../service/reducer/actions";
import {handleDownLeft, handleUpLeft} from "../../service/functions/util";

const useStyles = makeStyles({
    girlStation: {
        overflow:"hidden",
        background: "#ffeff0",
        height: "calc(100vh - 60px)",
        width: "15%",
        "@media screen and (max-width:1115px)": {
            display :"none"
        },
        alignItems: "center",
        justifyContent: "center",
        borderRight: "2px solid pink",
    }
});

function LeftBar(props) {
    const classes = useStyles()
    const arrAnime = [anime1, anime2, anime3, anime4]

    return (
        <div className={classes.girlStation}>
            <div style={{display: "flex", justifyContent: 'center', alignItems: "center", height: 70}}>
                <IconButton
                    onClick={() => handleUpLeft(props.indexAnimeLeft, arrAnime, props.setLeftGirl)}><KeyboardArrowUpIcon
                    fontSize={"large"}/></IconButton>
            </div>
            <div
                style={{display: "flex", justifyContent: 'center', alignItems: "center", height: "calc(100% - 140px)"}}>
                <img style={{height: "60%"}} src={arrAnime[props.indexAnimeLeft]}/>
            </div>
            <div style={{display: "flex", justifyContent: 'center', alignItems: "center", height: 70}}>
                <IconButton
                    onClick={() => handleDownLeft(props.indexAnimeLeft, arrAnime, props.setLeftGirl)}><KeyboardArrowDownIcon
                    fontSize={"large"}/></IconButton>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    ...state.anime
})

export default connect(mapStateToProps, {
    setLeftGirl,
})(LeftBar);