import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {makeStyles} from "@mui/styles";
import {Fade} from "@mui/material";
import RowResult from "./RowResult";


const useStyles = makeStyles({
    tableContainer: {
        width: "calc(100vw - 30%)",
        margin: "15px 25px 0 25px",
    },
    table: {
        height: "fit-content",
        padding: "35px",
        background: "white",
        borderRadius: "25px",
        boxShadow: "0 5px 20px gray",
    },
    scroll: {
        '&::-webkit-scrollbar': {
            width: "5px",
        },

        "&::-webkit-scrollbar-track": {
            background: "whitesmoke"
        },

        "&::-webkit-scrollbar-thumb": {
            borderRadius: "5px",
            backgroundColor: "#ffd3d3"
        }
    }
})

function TableCustom(props) {
    const classes = useStyles()

    return (
        <div className={classes.tableContainer}>
            <Fade in={true} timeout={750}>
                <div className={classes.table}>
                    <TableContainer>
                        <div>
                            <Table>
                                <TableRow>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#ff9fb0", width: "15%"}}
                                        align="center">X</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#ff9fb0", width: "15%"}}
                                        align="center">Y</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#ff9fb0", width: "15%"}}
                                        align="center">R</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#ff9fb0", width: "20%"}}
                                        align="center">RESULT</TableCell>
                                    <TableCell
                                        sx={{color: "white", fontWeight: "bold", background: "#ff9fb0", width: "25%"}}
                                        align="center">TIME</TableCell>
                                </TableRow>
                            </Table>
                        </div>
                            <div className={classes.scroll}
                                 style={{overflowY: 'scroll', maxHeight: 'calc(100vh - 330px)'}}>
                                <Table>
                                    <TableBody>
                                        {props.data?.map((res) => (
                                            <RowResult res={res}/>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                    </TableContainer>
                </div>
            </Fade>
        </div>
    );
}

export default TableCustom;