import axios from "axios";
import { APIURL } from "../../config/apiConfig";

export class CarService {
    async getAllCollection() {
        return axios.get(`${APIURL}/car/complete/car/detail`)
    }
    async getCarDetailById(carId:any){
        return axios.get(`${APIURL}/car/completeCarDetailById/${carId}`)
    }


    // async addPost(postDetail: any) {
    //     return axios.post(`${APIURL}/posts`, postDetail);
    // }
}