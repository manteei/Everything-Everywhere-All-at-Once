import { combineReducers } from 'redux'
import app from './appReducer'
import anime from './animeReducer'

export default combineReducers({
    app,
    anime
})