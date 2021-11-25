import axios from "axios";
import { APIURL } from "../config/apiConfig";

export class AllCityService {
    async getAllCollection() {
        return axios.get(`${APIURL}/city`)
    }


    // async addPost(postDetail: any) {
    //     return axios.post(`${APIURL}/posts`, postDetail);
    // }
}