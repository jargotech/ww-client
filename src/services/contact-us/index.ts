import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class ContactUsService {
  contactUs(payload: any) {
    return axios.post(`${APIURL}/contact`, payload);
  }
}
