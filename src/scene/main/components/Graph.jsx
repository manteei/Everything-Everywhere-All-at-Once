import React from 'react';
import {makeStyles} from "@mui/styles";
import {Fade, Zoom} from "@mui/material";
import toast from "react-hot-toast";

const useStyles = makeStyles({
    cardContainer: {
        margin: "15px 0 0 25px",
        width: "430px"
    },
    cardGraph: {
        background: "white",
        borderRadius: "25px",
        boxShadow: "5px 5px 20px gray",
    },
    graph: {
        margin: "15px",
    },
    figure: {
        transition: "0.3s",
        "&:hover": {
            fill: "rgba(251, 231, 239)",
            transition: "0.3s"
        }
    }
});


function Graph(props) {
    const classes = useStyles()

    function shot(e) {
        if (props.r === "") {
            toast("Радиус не выбран", {
                icon: '💔',
                style: {
                    borderRadius: '10px',
                    background: '#fff',
                    fontWeight: "bold",
                    border: "2px solid pink"
                }
            })
        } else
        {
            const elem = document.getElementById("graph")
            let point = elem.getBoundingClientRect();
            let xVal = e.clientX - point.left
            let yVal = e.clientY - point.top
            let x = (((xVal - 200) * props.r) / 140).toFixed(1)
            let y = (((200 - yVal) * props.r) / 140).toFixed(1)
            const body = {
                x: Number(x),
                y: Number(y),
                r: props.r
            }
            props.setPoint(body)
        }
    }

    return (
        <div className={classes.cardContainer}>
            <Zoom in={true} timeout={500}>
                <div className={classes.cardGraph} onClick={(e) => shot(e)}>
                    <svg id={"graph"} className={classes.graph} width="400" height="400">
                        <line x1="0" x2="400" y1="200" y2="200" stroke="black"/>
                        <text x="385" y="185">X</text>
                        <polygon points="400,200 385,206 385,194" stroke="black"/>
                        <line x1="270" x2="270" y1="207" y2="193" stroke="black"/>
                        <text x="260" y="185">R/2</text>
                        <line x1="340" x2="340" y1="207" y2="193" stroke="black"/>
                        <text x="335" y="185">R</text>
                        <line x1="130" x2="130" y1="207" y2="193" stroke="black"/>
                        <text x="120" y="185">R/2</text>
                        <line x1="60" x2="60" y1="207" y2="193" stroke="black"/>
                        <text x="55" y="185">R</text>
                        <line x1="200" x2="200" y1="0" y2="400" stroke="black"/>
                        <text x="215" y="15">Y</text>
                        <polygon points="200,0 194,15 206,15" stroke="black"/>
                        <line x1="207" x2="193" y1="270" y2="270" stroke="black"/>
                        <text x="215" y="275">R/2</text>
                        <line x1="207" x2="193" y1="340" y2="340" stroke="black"/>
                        <text x="215" y="345">R</text>
                        <line x1="207" x2="193" y1="130" y2="130" stroke="black"/>
                        <text x="215" y="135">R/2</text>
                        <line x1="207" x2="193" y1="60" y2="60" stroke="black"/>
                        <text x="215" y="65">R</text>
                        <rect className={classes.figure} x="200" y="200" height="140" width="70" fill="pink"
                              fill-opacity="0.5"
                              stroke="pink"></rect>
                        <polygon className={classes.figure} points="340,200 200,60 200,200" fill="pink"
                                 fill-opacity="0.7"
                                 stroke="pink)"></polygon>
                        <path className={classes.figure} d="M200 200 L 60 200 C 60 200 60 60 200 60" fill-opacity="0.6"
                              stroke="pink" fill="pink"></path>
                        {props.data?.map((el) =>
                            <Fade in={true} timeout={200}>
                                <circle r="3" cx={el.x * 140 / el.r + 200}
                                        cy={el.y * -140 / el.r + 200} fill={el.result ? "red" : "whitesmoke"}
                                        stroke={el.result ? "firebrick" : "gray"}/>
                            </Fade>
                        )}
                    </svg>
                </div>
            </Zoom>
        </div>
    );
}

export default Graph;