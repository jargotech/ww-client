import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class AuthenticationService {
  userSignUp(payload: any) {
    return axios.post(`${APIURL}/users`, payload);
  }
}
