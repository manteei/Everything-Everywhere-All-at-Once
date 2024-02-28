import {DELETE_ALL, FAILED, GET_POINTS, LOGIN, OFF_REDIRECT, REGISTRATION, REQUEST, SET_POINT, SUCCESS} from "./const";
import toast from "react-hot-toast";

const DEFAULT_STATE = {
    data: [],
    isRedirect: false,
    fetchingReg: false,
}

const style = {
    borderRadius: '10px',
    background: '#fff',
    fontWeight: "bold",
    border: "2px solid pink"
}

export default function appReducer(state = DEFAULT_STATE, {type, payload}) {
    switch (type) {
        case SUCCESS + LOGIN:
            toast(payload.message, {
                icon: '❤',
                style
            })
            localStorage.setItem("token", payload.accessToken)
            localStorage.setItem("role", payload.role )
            return {
                ...state,
                isRedirect: true
            }

        case FAILED + LOGIN:
            toast(payload.message, {
                icon: '💔',
                style
            })
            return {
                ...state,
                isRedirect: false
            }

        case SUCCESS + REGISTRATION:
            toast(payload.message, {
                icon: '❤',
                style
            })
            return {
                ...state,
                isRedirect: true,
                fetchingReg: false
            }

        case REQUEST + REGISTRATION:
            return {
                ...state,
                isRedirect: false,
                fetchingReg: true
            }

        case FAILED + REGISTRATION:
            toast(payload.message, {
                icon: '💔',
                style
            })
            return {
                ...state,
                isRedirect: false,
                fetchingReg: false
            }

        case OFF_REDIRECT:
            return {
                ...state,
                isRedirect: false,
                fetchingReg: false
            }

        case SUCCESS + SET_POINT:
            return {
                ...state,
                data: [...state.data, payload]
            }

        case FAILED + SET_POINT:
            toast(payload.message, {
                icon: '💔',
                style
            })
            return {
                ...state
            }

        case SUCCESS + GET_POINTS:
            return {
                ...state,
                data: payload
            }

        case FAILED + GET_POINTS:
            toast(payload.message, {
                icon: '💔',
                style
            })
            return {
                ...state
            }

        case SUCCESS + DELETE_ALL:
            return {
                ...state,
                data: []
            }

        case FAILED + DELETE_ALL:
            toast(payload.message, {
                icon: '💔',
                style
            })
            return {
                ...state
            }

        default:
            return state
    }
}