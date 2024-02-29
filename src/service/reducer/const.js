const  API = "http://localhost:8080"
const USER = API + "/user"
export const TABLE = API + "/table"
export const AUTH = USER + "/auth"
export const REG = USER + "/reg"

export const WORK = API +  "/work"
export const TECHNICAL_TASKS = WORK + "/tasks"

export const PROF = API + "/profile"

export const INC = PROF + "/incidents"

export const TECH_INC = WORK + "/incidents"
export const ADD_INC = TECH_INC + "/addIncidents"

export const MY_FRIENDS = PROF + "/myFriends"

export const ALL_PERSON = PROF + "/allPerson"

export const TASKS = PROF + "/moving/task"

export const RESULT = PROF + "/moving/result"

export const QUESTIONNAIRE = PROF + "/questionnaire"
export const REQ = PROF + "/requests"
export const SUCCESS = "SUCCESS "
export const FAILED = "FAILED "
export const REQUEST = "REQUEST "

export const GET_POINTS = "GET_POINTS"
export const SET_POINT = "SET_POINT"
export const DELETE_ALL = "DELETE_ALL"
export const LOGIN = "LOGIN"
export const REGISTRATION = "REGISTRATION"
export const OFF_REDIRECT = "OFF_REDIRECT"

export const SET_LEFT_GIRL = "SET_LEFT_GIRL"
export const SET_RIGHT_GIRL = "SET_RIGHT_GIRL"


