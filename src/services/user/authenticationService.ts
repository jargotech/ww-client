import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class AuthenticationService{
    userSignIn(payload: any){
        return axios.post(`${APIURL}/users/signin`,payload)
    }

    userSignUp(payload: any){
        return axios.post(`${APIURL}/users`, payload)
    }

}