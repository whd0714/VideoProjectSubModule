import {
    USER_AUTH,
    USER_LOGIN,
    USER_REGISTER
} from "../_actions/type";

export default function (state={}, action) {
    switch (action.type) {
        case USER_REGISTER:
            return {...state, register:action.payload}
            break;

        case USER_LOGIN:
            return {...state, login:action.payload}
            break;

        case USER_AUTH:
            return {...state, auth:action.payload}
            break;

        default:
            return state
    }
}