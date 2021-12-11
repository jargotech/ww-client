import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class LandingService {
    async getAllLandingService() {
        return axios.get(`${APIURL}/userHome`);
    }

    async getAllLatesArrival() {
        return axios.get(`${APIURL}/userHome/getLatestArrival`);
    }
}