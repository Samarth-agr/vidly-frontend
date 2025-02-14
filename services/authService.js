import http from "./httpService";
import config from "../src/util/config.json"
import {jwtDecode} from 'jwt-decode'

const apiEndpoint = config.apiUrl + "auth";
const token = "token";

http.setJwt(getJwt())

export async function login(data){
    const {data : jwt} =  await http.post(apiEndpoint , {
        "email" : data.username,
        "password" : data.password
    })
    localStorage.setItem(token , jwt)    
}

export function logout(){
    localStorage.removeItem(token)
}

export function getCurrentUser(){
    try{ //we will see that the user is logged in or not
          const jwt = localStorage.getItem(token);
          return jwtDecode(jwt); //use to decode the jwt token. we can simulate it at jwt.io
        }
        catch(ex){
            return null
        }
}

export function getJwt(){
    return localStorage.getItem(token)
}