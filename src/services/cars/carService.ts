import axios from "axios";
import { APIURL } from "../../config/apiConfig";
import axiosInstance from "../../utils/axiosInstance";
import { xAccessToken } from "../../utils/getAccessToken";

export class CarService {
  async getAllCollection() {
    return axios.get(`${APIURL}/car/complete/car/detail`);
  }
  async getCarDetailById(carId: any) {
    return axios.get(`${APIURL}/car/completeCarDetailById/${carId}`);
  }
  async getAllBrands() {
    return axios.get(`${APIURL}/carMake`);
  }

  sellCar(payload: any) {
    return axiosInstance.post(`/sellCar`, payload);
  }

  bookTrial(payload: any) {
    return axiosInstance.post(`/trial`, payload);
  }

  getInpectionsById(payload:any){
    return axiosInstance.get(`/sellCar/getBy/UserId/${payload}`)
  }
}
