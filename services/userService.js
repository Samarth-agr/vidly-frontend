import http from "./httpService";
import config from "../src/util/config.json"

const apiEndpoint = config.apiUrl + 'users';

export function register(user){
    return http.post(apiEndpoint , {
        "email" : user.email,
        "password": user.password,
        "name": user.name,
        "username": user.username
    })
}
