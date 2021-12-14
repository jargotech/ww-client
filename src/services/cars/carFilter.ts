import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class CarFilter {

    postAllFilter(data: any) {
        return axios.post(`${APIURL}/car/filter/car/detail`, data)
    }
}