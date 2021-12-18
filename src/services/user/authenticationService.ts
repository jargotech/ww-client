import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class AuthenticationService{
    userSingIn(payload: any){
        return axios.post(`${APIURL}/users/signin`,payload)
    }
}