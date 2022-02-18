import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class SocialMediaService {
  socialMedia() {
    return axios.get(`${APIURL}/socialMedia`);
  }
}
