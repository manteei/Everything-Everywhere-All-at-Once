import React from 'react';
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {makeStyles} from "@mui/styles";
import Fade from "@mui/material/Fade";

const useStyles = makeStyles({
    tableRow: {
        "&:hover": {
            backgroundColor: "whitesmoke"
        }
    }
})

function comparatorProps(prevProps, currentProps) {
    return prevProps.res.id === currentProps.res.id ||
        prevProps.res.x === currentProps.res.x ||
        prevProps.res.y === currentProps.res.y ||
        prevProps.res.r === currentProps.res.r ||
        prevProps.res.result === currentProps.res.result ||
        prevProps.res.time === currentProps.res.time

}

function RowResult(props) {
    const classes = useStyles()

    return (
        <Fade in={true} timeout={500}>
            <TableRow className={classes.tableRow}>
                <TableCell sx={{width: "15%"}} align="center">{props.res.x}</TableCell>
                <TableCell sx={{width: "15%"}} align="center">{props.res.y}</TableCell>
                <TableCell sx={{width: "15%"}} align="center">{props.res.r}</TableCell>
                <TableCell sx={{width: "20%"}}
                           align="center">{props.res.result ? "Попадание" : "Промах"}</TableCell>
                <TableCell sx={{width: "25%"}}
                           align="center">{ new Date(props.res.time).toLocaleString()}</TableCell>
            </TableRow>
        </Fade>
    );
}

export default React.memo(RowResult, comparatorProps);