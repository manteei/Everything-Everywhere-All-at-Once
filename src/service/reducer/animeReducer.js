import {SET_LEFT_GIRL, SET_RIGHT_GIRL} from "./const";

const DEFAULT_STATE = {
    indexAnimeLeft: 0,
    indexAnimeRight: 0,
}

export default function reducer(state = DEFAULT_STATE, {type, payload}) {
    switch (type) {
        case SET_LEFT_GIRL:
            return {
                ...state,
                indexAnimeLeft: payload
            }

        case SET_RIGHT_GIRL:
            return {
                ...state,
                indexAnimeRight: payload
            }

        default:
            return state
    }
}