import {call} from "../functions/call";
import {
    AUTH,
    DELETE_ALL,
    GET_POINTS,
    LOGIN,
   OFF_REDIRECT,
    REG,
    REGISTRATION,
    SET_LEFT_GIRL,
    SET_POINT,
    SET_RIGHT_GIRL, TABLE
} from "./const";

export const getPoints = () => call({
    type: GET_POINTS,
    url: TABLE,
    method: "GET",
})

export const setPoint = (body) => call({
    type: SET_POINT,
    url: TABLE,
    method: "POST",
    body
})

export const deleteAll = () => call({
    type: DELETE_ALL,
    url: TABLE,
    method: "DELETE"
})


export const login = (body) => call({
    type: LOGIN,
    url: AUTH,
    method: "POST",
    body
})

export const registration = (body) => call({
    type: REGISTRATION,
    url: REG,
    method: "POST",
    body
})

export const setLeftGirl = (payload) => ({
    type: SET_LEFT_GIRL,
    payload: payload
})

export const setRightGirl = (payload) => ({
    type: SET_RIGHT_GIRL,
    payload: payload
})

export const offRedirect = () => ({
    type: OFF_REDIRECT
})