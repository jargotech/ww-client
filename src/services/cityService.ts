import axios from "axios";
import { APIURL } from "../config/apiConfig";

export class CityService {
    getAllCity = () => {
        axios.get(`${APIURL}/city`).then((res) => {
            return res
        })
    }


}