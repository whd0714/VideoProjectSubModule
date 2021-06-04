import axios from "axios";
import {
    USER_LOGIN,
    USER_AUTH,
    USER_REGISTER
} from "./type";

export function userRegister(data) {
    const request = axios.post("/api/register",
        JSON.stringify(data),
        {headers:{'content-type':'application/json; charset=UTF-8'}})
        .then(response=>response.data)

    return {
        type:USER_REGISTER,
        payload:request
    }
}

export function userLogin(data) {
    const request = axios.post('api/login',
        JSON.stringify(data),
        {headers:{'content-type':'application/json; charset=UTF-8'}})
        .then(response=>response.data)

    return {
        type:USER_LOGIN,
        payload:request
    }
}

export function userAuth() {
    const request = axios.get('/api/auth')
        .then(response=>response.data)

    return {
        type:USER_AUTH,
        payload:request
    }
}