import {FAILED, REQUEST, SUCCESS} from "../reducer/const";

function createAction(type, payload) {
    return {
        type: type,
        payload: payload
    };
}

export function call({type, url, method, body}) {
    return function (dispatch) {
        fetch(url, {
            "method": method,
            "headers": {
                "content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            "body": JSON.stringify(body)
        }).then(response => {
            dispatch(createAction(REQUEST + type))
            if (response.status === 200 || response.status === 201) {
                response.json().then(json => dispatch(createAction(SUCCESS + type, json)))
            } else if (response.status === 500) {
                dispatch(createAction(FAILED + type, {"message": "Сервер недоступен"}))
            } else {
                response.json().then((err => dispatch(createAction(FAILED + type, err))))
            }
        });
    }
}