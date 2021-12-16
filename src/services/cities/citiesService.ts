import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class CitiesService{
    getAllCities(){
        return axios.get(`${APIURL}/city`)
    }
}